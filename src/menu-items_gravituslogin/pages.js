// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'Loginverify1',
      title: 'Loginverify',
      type: 'item',
      url: '/loginverify',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'Forgetpassword1',
      title: 'Forget password',
      type: 'item',
      url: '/forgetpassword',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'Forgetpasswordstatus1',
      title: 'Forget password status',
      type: 'item',
      url: '/forgetpasswordstatus',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};
export default pages;
