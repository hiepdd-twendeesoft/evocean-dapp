"use client";
import { Route } from "@/constants/route";
import useBalance from "@/hooks/useBalance";
import { RootState, authActions } from "@/store/slices";
import { useAppDispatch } from "@/store/store";
import { shortenAddress } from "@/utils/helper";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TabBar = () => {
  const pathname = usePathname();
  const { connect, select, publicKey, disconnect, connected } = useWallet();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogin, accountInfo } = useSelector(
    (state: RootState) => state.auth
  );
  const [domLoaded, setDomLoaded] = useState(false);
  const [showOption, setShowOption] = useState<boolean>(false);
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const balance = useBalance(publicKey);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const handleConnectWallet = useCallback(async () => {
    try {
      await select(PhantomWalletName);
      await connect();
    } catch (error) {}
  }, [connect, select]);

  const handleProfile = useCallback(() => {
    setShowOption(false);
  }, []);

  const handleOption = useCallback(() => {
    setShowOption((prev) => !prev);
  }, []);

  const handleSignOut = useCallback(() => {
    disconnect();
    dispatch(authActions.logout());
    router.push("/login", { scroll: false });
    setShowSetting(false);
  }, [disconnect, dispatch, router]);

  const clickSetting = (route: string) => {
    router.push(route, { scroll: false });
    setShowSetting(false);
  };

  return (
    <Fragment>
      {domLoaded && (
        <div className="min-h-full">
          <nav className="bg-white border-b-[1px] border-b-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link href={"/"}>
                    <div className="flex-shrink-0">
                      <img
                        className="h-[24px] w-[146px]"
                        src={"/assets/image/Logo.svg"}
                        alt="Your Company"
                      />
                    </div>
                  </Link>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link
                        href={Route.BROWSE_ALL}
                        className={`hover:bg-indigo-600 hover:text-white text-gray-900 rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === Route.BROWSE_ALL
                            ? "text-indigo-600 decoration-solid underline"
                            : ""
                        }`}
                        aria-current="page"
                      >
                        Browse All
                      </Link>
                      <Link
                        href={Route.CODED_TEMPLATE}
                        className={`hover:bg-indigo-600 hover:text-white text-gray-900 rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === Route.CODED_TEMPLATE
                            ? "text-indigo-600 decoration-solid underline"
                            : ""
                        }`}
                      >
                        Coded Template
                      </Link>
                      <Link
                        href={Route.BRANDING}
                        className={`hover:bg-indigo-600 hover:text-white text-gray-900 rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === Route.BRANDING
                            ? "text-indigo-600 decoration-solid underline"
                            : ""
                        }`}
                      >
                        Branding
                      </Link>
                      <Link
                        href={Route.PRESENTATION}
                        className={`hover:bg-indigo-600 hover:text-white text-gray-900 rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === Route.PRESENTATION
                            ? "text-indigo-600 decoration-solid underline"
                            : ""
                        }`}
                      >
                        Presentation
                      </Link>
                      <Link
                        href={Route.UI_KIT}
                        className={`hover:bg-indigo-600 hover:text-white text-gray-900 rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === Route.UI_KIT
                            ? "text-indigo-600 decoration-solid underline"
                            : ""
                        }`}
                      >
                        UI Kit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="md:block relative">
                  <div className="ml-4 flex items-center md:ml-6">
                    <div className="relative mr-3">
                      <div>
                        {connected ? (
                          <div className="flex items-center">
                            <div className="flex items-center h-[32px] md:h-[44px] rounded-[12px] bg-indigo-50 px-3 mr-2">
                              <img
                                src={"/assets/icon/wallet.svg"}
                                alt="wallet"
                                className="w-[20px] mr-2 md:block hidden"
                              />
                              <p className="text-[12px] md:text-sm font-medium text-indigo-600">
                                {balance} SOL
                              </p>
                            </div>
                            <button
                              onClick={handleOption}
                              className="flex items-center h-[32px] md:h-[44px] px-2 rounded-[12px] bg-indigo-50 md:px-3"
                            >
                              <img
                                src={"/assets/image/SOL.svg"}
                                alt="SOL"
                                className="md:w-[32px] w-[20px]"
                              />
                              <p className="text-sm font-medium text-indigo-600 ml-2 hidden md:block">
                                {shortenAddress(publicKey?.toBase58() || "")}
                              </p>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleConnectWallet}
                            type="button"
                            className="relative flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true"
                          >
                            <p className="text-slate-900 text-[11px] md:text-base font-medium mr-1">
                              Connect wallet
                            </p>
                            <img
                              className="h-[20px] w-[20px] rounded-full"
                              src={"/assets/image/wallet.svg"}
                              alt="wallet"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    {isLogin ? (
                      <div className="cursor-pointer flex items-center justify-center gap-2">
                        <div className="relative">
                          <div
                            onClick={() => setShowSetting(!showSetting)}
                            className="cursor-pointer flex items-center justify-center py-2 px-4 border-[#E2E8F0] rounded-[12px] border-b border-solid border-[1px]"
                          >
                            <h4 className="text-[#000]">Account</h4>
                            <div>
                              <img
                                src={"/assets/image/drop-down.svg"}
                                alt="sale"
                                className="w-5 h-5"
                              />
                            </div>
                          </div>
                          {showSetting && (
                            <div
                              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                            >
                              <div className="py-1" role="none">
                                <p
                                  className="text-gray-700 block px-4 py-2 text-sm"
                                  role="menuitem"
                                  id="menu-item-0"
                                >
                                  Signed in as {accountInfo?.email}
                                </p>
                              </div>
                              <div className="py-1" role="none">
                                <Link
                                  href={Route.PROFILE}
                                  onClick={handleProfile}
                                  className="text-gray-700 block px-4 py-2 text-sm"
                                >
                                  Your profile
                                </Link>
                                <Link
                                  href="#"
                                  className="text-gray-700 block px-4 py-2 text-sm"
                                >
                                  Purchased
                                </Link>
                                <Link
                                  href="#"
                                  className="text-gray-700 block px-4 py-2 text-sm"
                                >
                                  Owned
                                </Link>
                              </div>
                              <div className="py-1" role="none">
                                <Link
                                  href="/admin/dashboard"
                                  className="text-gray-700 block px-4 py-2 text-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    clickSetting(Route.DASHBOARD_OVERVIEW);
                                  }}
                                >
                                  Seller dashboard
                                </Link>
                                <Link
                                  href="/admin/dashboard"
                                  className="text-gray-700 block px-4 py-2 text-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    clickSetting(Route.DASHBOARD_OVERVIEW);
                                  }}
                                >
                                  Investor dashboard
                                </Link>
                              </div>
                              <div className="py-1" role="none">
                                <Link
                                  href="#"
                                  className="text-gray-700 block px-4 py-2 text-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSignOut();
                                  }}
                                >
                                  Logout
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <img
                            src={
                              "https://pbs.twimg.com/media/FoUoGo3XsAMEPFr?format=jpg&name=4096x4096"
                            }
                            alt="avatar"
                            className="w-[36px] h-[36px] object-cover rounded-[50%]"
                          />
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="relative mr-3 flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() => {
                          router.push("/login", { scroll: false });
                        }}
                      >
                        <p className="text-slate-900 text-base font-medium mr-1">
                          Login
                        </p>
                        <img
                          className="h-[20px] w-[20px] rounded-full"
                          src={"/assets/image/Google.svg"}
                          alt="Google"
                        />
                      </button>
                    )}
                  </div>
                  {/* {showOption && (
                    <div
                      className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mt-2"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <Link
                        href={Route.PROFILE}
                        onClick={handleProfile}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                      <a
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                      >
                        Sign out
                      </a>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </Fragment>
  );
};

export default TabBar;
