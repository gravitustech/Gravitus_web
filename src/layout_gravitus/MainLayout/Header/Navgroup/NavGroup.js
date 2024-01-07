import PropTypes from 'prop-types';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import GravitusNavItem from './NavItem';

const GravitusNavGroup = ({ item }) => {
  const theme = useTheme();
  // console.log(theme);

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  // console.log(isMatch);
  return (
    <>
      {isMatch ? (
        <>

          <Stack direction="column" sx={{ paddingBottom: '20px' }} maxWidth='100%' width='100%' justifyContent='space-between'>
            {item.children?.map((menuItem) => (
              <GravitusNavItem key={menuItem.id} item={menuItem} level={1} />
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="row" spacing={4}>
            {item.children?.map((menuItem) => (
              <GravitusNavItem key={menuItem.id} item={menuItem} level={1} />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

GravitusNavGroup.propTypes = {
  item: PropTypes.object
};

export default GravitusNavGroup;
