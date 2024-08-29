import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { walletLoginAction } from '@/store/actions/auth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/slices';
import { walletLogin } from '@/services/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface useLoginWalletProps {
  isGoogleLogin?: boolean;
}

const useLoginWallet = (isGoogleLogin?: boolean) => {
  const { connect, select, publicKey, disconnect, signIn, signMessage } =
    useWallet();
  const { accountInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [connected, setConnected] = useState(false);
  const router = useRouter();

  const onConnectWallet = async () => {
    try {
      select(PhantomWalletName);
      await signIn!();
      // await connect();
    } catch (error) {}
  };

  const onDisconnect = () => {
    disconnect();
    setConnected(false);
  };

  const handleLoginWithWallet = useCallback(async () => {
    if (publicKey) {
      setConnected(false);
      try {
        const res = await walletLogin({
          address: publicKey?.toBase58(),
          user_id: accountInfo?.id
        });
        dispatch(walletLoginAction(res));
        setConnected(true);
      } catch (e: any) {
        setConnected(false);
        disconnect();
        toast.warn(e?.response?.data?.message);
      }
    }
  }, [accountInfo?.id, disconnect, dispatch, publicKey]);

  useEffect(() => {
    if (publicKey && !isGoogleLogin) {
      handleLoginWithWallet();
    }
  }, [publicKey]);

  return { onConnectWallet, onDisconnect, connected };
};

export default useLoginWallet;
