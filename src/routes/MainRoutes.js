import { lazy } from 'react';
import Loadable from '../components/Loadable';
import GravitusMainLayout from '../layout_gravitus/MainLayout/index';

import DepositPage from '../new_pages/components-overview/Walletpage/Deposit/index';
import WithdrawPage from '../new_pages/components-overview/Walletpage/Withdraw/index';
import HistoryPage from '../new_pages/components-overview/Walletpage/History/index';

import InrWithdraw from '../new_pages/components-overview/Walletpage/InrWithdraw/InrWithdraw';
import InrWithdrawpage1 from '../new_pages/components-overview/Walletpage/InrWithdraw/InrWithdraw_EXT';
// import InrWithdrawpage2 from '../new_pages/components-overview/Walletpage/InrWithdraw/Del_InrWithdraw_SP';

import InrDeposit from '../new_pages/components-overview/Walletpage/InrDeposit/InrDeposit';
import InrDepositpage1 from '../new_pages/components-overview/Walletpage/InrDeposit/InrDeposit_STEP1';
import InrDepositpage2 from '../new_pages/components-overview/Walletpage/InrDeposit/InrDeposit_STEP2';
import InrDepositpage3 from '../new_pages/components-overview/Walletpage/InrDeposit/InrDeposit_STEP3';

import Buyer_Trade_Dts from '../new_pages/components-overview/P2Ppage/P2P_Table/P2P_My_Trades/Trade_Details/Trade_Buyer_pr';
import Seller_Trade_Dts from 'src/new_pages/components-overview/P2Ppage/P2P_Table/P2P_My_Trades/Trade_Details/Trade_Seller_pr';

import P2P_Manage_Ads from 'src/new_pages/components-overview/P2Ppage/P2P_Table/P2P_Manage_Ads/index.js';
import P2P_My_Trades from 'src/new_pages/components-overview/P2Ppage/P2P_Table/P2P_My_Trades/index.js';
import P2P_Trades from 'src/new_pages/components-overview/P2Ppage/P2P_Table/P2P_Trades/P2P_Trades';

import { Navigate } from 'react-router';
import Page404 from 'src/new_pages/components-overview/Page404/Page404';
import ProfileScreen from 'src/new_pages/components-overview/Profilescreen';

import Registerstatus from 'src/new_pages/authentication/Registerstatus';
import Notificationpage from 'src/layout_gravitus/MainLayout/Header/HeaderContent/Notificationpage';

//Gravitus import pages
const GravitusAuthLogin = Loadable(lazy(() => import('../new_pages/authentication/Login')));
const GravitusAuthRegister = Loadable(lazy(() => import('../new_pages/authentication/Register')));

const GravitusHomePage = Loadable(lazy(() => import('../new_pages/components-overview/Homepage/index')));
const Marketpage = Loadable(lazy(() => import('../new_pages/components-overview/Marketpage/index')));
const Spotpage = Loadable(lazy(() => import('../new_pages/components-overview/Spotpage/Spotpage')));
const P2Ppage = Loadable(lazy(() => import('../new_pages/components-overview/P2Ppage/index')));
const Walletpage = Loadable(lazy(() => import('../new_pages/components-overview/Walletpage/index')));

const GravitusAuthForgetpassword = Loadable(lazy(() => import('../new_pages/authentication/Forgetpassword')));
const GravitusAuthForgetpasswordStatus = Loadable(lazy(() => import('../new_pages/authentication/Forgetpasswordstatus')));
const GravitusAuthLoginVerify = Loadable(lazy(() => import('../new_pages/authentication/LoginVerify')));
const GravitusAuthLoginVerifyothers = Loadable(lazy(() => import('../new_pages/authentication/LoginVerifyothers')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <GravitusMainLayout />,
  children: [
    {
      path: '404',
      element: <Page404 />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path: '/',
      element: <GravitusHomePage />
    },
    {
      path: 'login',
      element: <GravitusAuthLogin />
    },
    {
      path: 'register',
      element: <GravitusAuthRegister />
    },
    {
      path: 'registerstatus',
      element: <Registerstatus />
    },
    {
      path: 'market',
      element: <Marketpage />
    },
    {
      path: 'Spotpage',
      element: <Spotpage />
    },
    {
      path: 'p2p',
      element: <P2Ppage />
    },
    {
      path: 'wallet',
      element: <Walletpage />
    },
    {
      path: 'forgetpassword',
      element: <GravitusAuthForgetpassword />
    },
    {
      path: 'forgetpasswordstatus',
      element: <GravitusAuthForgetpasswordStatus />
    },
    {
      path: 'loginverify',
      element: <GravitusAuthLoginVerify />
    },
    {
      path: 'loginverifyothers',
      element: <GravitusAuthLoginVerifyothers />
    },
    {
      path: 'deposit',
      element: <DepositPage />
    },
    {
      path: 'withdraw',
      element: <WithdrawPage />
    },
    {
      path: 'history',
      element: <HistoryPage />
    },
    {
      path: 'inrwithdraw',
      element: <InrWithdraw />
    },
    {
      path: 'inrwithdrawbankdeatils',
      element: <InrWithdrawpage1 />
    },
    // {
    //   path: 'inrwithdrawotpverify',
    //   element: <InrWithdrawpage2 />
    // },
    {
      path: 'inrdeposit',
      element: <InrDeposit />
    },
    {
      path: 'inrdepositrecheck',
      element: <InrDepositpage2 />
    },
    {
      path: 'inrdepositbank',
      element: <InrDepositpage3 />
    },
    {
      path: 'Buyer_Trade_Dts',
      element: <Buyer_Trade_Dts />
    },
    {
      path: 'Seller_Trade_Dts',
      element: <Seller_Trade_Dts />
    },
    {
      path: 'P2P_Manage_Ads',
      element: <P2P_Manage_Ads />
    },
    {
      path: 'P2P_My_Trades',
      element: <P2P_My_Trades />
    },
    {
      path: 'P2P_Trades',
      element: <P2P_Trades />
    },
    {
      path: 'profile/*',
      element: <ProfileScreen />
    },
    {
      path: 'profile',
      element: <Navigate to="/profile/dashboard" />
    },
    {
      path: 'notification',
      element: <Notificationpage />
    },
  ]
};

export default MainRoutes;