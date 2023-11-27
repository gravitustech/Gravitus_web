// material-ui
import { Box } from '@mui/material';

// project import
import menuItem from '../../../../menu-tems_logo';
import GravitusNavGroupRegister from './NavGroupLogo';
import GravitusNavGroupLogo from './NavGroupLogo';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const GravitusNavigationLogo = () => {
  const navGroups = menuItem.items.map((item) => {
    return <GravitusNavGroupLogo key={item.id} item={item} />;
  });

  return <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, }}>{navGroups}</Box>
    ;
};

export default GravitusNavigationLogo;
