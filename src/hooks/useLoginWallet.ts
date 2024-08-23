import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { walletLogin } from '@/services/auth';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { walletLoginAction } from '@/store/actions/auth';

const useLoginWallet = () => {
  const { connect, select, publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const onConnectWallet = async () => {
    try {
      select(PhantomWalletName);
      await connect();
    } catch (error) {}
  };

  useEffect(() => {
    if (publicKey) {
      dispatch(walletLoginAction(publicKey.toBase58()));
    }
  }, [publicKey]);

  return { onConnectWallet };
};

export default useLoginWallet;
