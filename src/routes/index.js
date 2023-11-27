import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  // const { isAuthenticated, user:{isSuperAdmin} } = useSelector((state) => state.adminUser)
  const isAuthenticated = true;
  return useRoutes([isAuthenticated ? MainRoutes : LoginRoutes]);
}
