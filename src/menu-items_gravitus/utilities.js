// assets
import { ReactComponent as marketicon } from '../assets/images/Drawericons/marketicon.svg';
import { ReactComponent as walleticon } from '../assets/images/Drawericons/walleticon.svg';

import { ReactComponent as spoticon } from '../assets/images/Drawericons/spoticon.svg';
import { ReactComponent as p2picon } from '../assets/images/Drawericons/p2picon.svg';

const icons = {
  marketicons: marketicon,
  spoticons: spoticon,
  p2picons: p2picon,
  walleticons: walleticon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-market',
      title: 'Market',
      type: 'item',
      url: '/Market',
      icon: icons.marketicons
    },
    {
      id: 'util-spot',
      title: 'Spot',
      type: 'item',
      url: '/Spotpage',
      icon: icons.spoticons
    },
    {
      id: 'util-p2p',
      title: 'P2P',
      type: 'item',
      url: '/P2P',
      icon: icons.p2picons
    },
    {
      id: 'util-wallet',
      title: 'Wallet',
      type: 'item',
      url: '/Wallet',
      icon: icons.walleticons
    }
  ]
};

export default utilities;
