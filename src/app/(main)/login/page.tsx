'use client';

import { googleLoginAction } from '@/store/actions/auth';
import { useAppDispatch } from '@/store/store';
import { useGoogleLogin } from '@react-oauth/google';
import { useWallet } from '@solana/wallet-adapter-react';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';

type Props = {};

const LoginPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { connect, select } = useWallet();

  // const navigate = useNavigate();

  const quickRegisterRedirect = (
    oauthToken: string,
    provider: 'google' | 'facebook'
  ) => {
    redirect('/login');
  };


  const google = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        await dispatch(
          googleLoginAction({
            access_token: access_token
          })
        );
        router.push('/', { scroll: false });
      } catch (error: any) {
        if ((error?.response?.data as any)?.statusCode === 400)
          quickRegisterRedirect(access_token, 'google');
      }
    }
  });

  const handleConnectWallet = useCallback(async () => {
    try {
      await select(PhantomWalletName);
      await connect();
      router.push('/', { scroll: false });
    } catch (error) {}
  }, [connect, select]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#03071299]">
      <div className="w-[494px] bg-white flex-col items-center px-[32px] py-[40px]">
        <div className="w-full flex justify-center">
          <img
            src={'/assets/image/mark.png'}
            alt="sale"
            className="w-[48px] mx-[4px]"
          />
        </div>
        <h1 className="text-[#111827] text-center text-[30px] font-extrabold	leading-[36px] mt-[24px]">
          Join Evocean with
        </h1>
        <button
          onClick={() => google()}
          className="bg-[#4F46E5] w-full flex justify-center items-center gap-3 self-stretch px-[23px] py-[13px] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mt-[40px]"
        >
          <div>
            <img
              src={'/assets/image/Google.svg'}
              alt="sale"
              className="w-5 h-5"
            />
          </div>
          <h3 className="text-[#FFF] text-base leading-6">Google account</h3>
        </button>
        <div className="flex justify-center items-center gap-2 self-stretch h-[12px] my-4">
          <div className="h-[1px] flex-[1_0_0] bg-[#d1d5db]"></div>
          <h3 className="text-center text-sm not-italic font-normal leading-5">
            Or with
          </h3>
          <div className="h-[1px] flex-[1_0_0] bg-[#d1d5db]"></div>
        </div>
        <button className="w-full flex justify-center items-center gap-3 rounded-[var(--rounded-md,12px)] border border-[color:var(--Gray-300,#D1D5DB)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-solid px-[23px] py-[13px]">
          <div>
            <img
              src={'/assets/image/wallet.svg'}
              alt="sale"
              className="w-5 h-5"
            />
          </div>
          <h3
            className="text-[#374151] text-base leading-6"
            onClick={handleConnectWallet}
          >
            Phantom Wallet
          </h3>
        </button>
        <div className="mt-12 text-[#6B7280] text-xs not-italic font-medium leading-5">
          By signing up, you agree to our{' '}
          <span className="text-[#111827]">
            <Link href={'/term'}>Terms</Link>
          </span>
          ,{' '}
          <span className="text-[#111827]">
            <Link href={'/term'}>Data Policy</Link>
          </span>{' '}
          and{' '}
          <span className="text-[#111827]">
            <Link href={'/term'}>Cookies Policy</Link>
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
