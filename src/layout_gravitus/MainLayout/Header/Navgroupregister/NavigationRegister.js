// material-ui
import { Box } from '@mui/material';

// project import
import menuItem from '../../../../menu-items_gravitusRegister';
import GravitusNavGroupRegister from './NavGroupRegister';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const GravitusNavigationRegister = () => {
  const navGroups = menuItem.items.map((item) => {
    return <GravitusNavGroupRegister key={item.id} item={item} />;
  });

  return <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pl: 1 }}>{navGroups}</Box>
    ;
};

export default GravitusNavigationRegister;
