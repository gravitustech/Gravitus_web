import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';

// project import

import Loadable from '../components/Loadable';
import GravitusMainLayout from '../layout_gravitus/MainLayout/index';
// import GravitusMinimalLayout from 'layout_gravitus/MinimalLayout';

// render - login
const GravitusAuthLogin = Loadable(lazy(() => import('../new_pages/authentication/Login')));
const GravitusAuthRegister = Loadable(lazy(() => import('../new_pages/authentication/Register')));
const GravitusAuthForgetpassword = Loadable(lazy(() => import('../new_pages/authentication/Forgetpassword')));
const GravitusAuthForgetpasswordStatus = Loadable(lazy(() => import('../new_pages/authentication/Forgetpasswordstatus')));
const GravitusAuthLoginVerify = Loadable(lazy(() => import('../new_pages/authentication/LoginVerify')));
const DenseTable = Loadable(lazy(() => import('../pages/testpage')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: 'test',
  element: <DenseTable />
};

export default LoginRoutes;
