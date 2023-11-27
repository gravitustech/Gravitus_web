// material-ui
import { Box } from '@mui/material';

// project import
import menuItem from '../../../../menu-items_gravitus';
import GravitusNavGroup from './NavGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const GravitusNavigation = () => {
  const navGroups = menuItem.items.map((item) => {
    return <GravitusNavGroup key={item.id} item={item} />;
  });

  return <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1, pl: 5 }}>{navGroups}</Box>;
};

export default GravitusNavigation;
