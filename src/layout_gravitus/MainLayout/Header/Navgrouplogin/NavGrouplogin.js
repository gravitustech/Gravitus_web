import PropTypes from 'prop-types';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import GravitusNavItemlogin from './Navitemlogin';

const GravitusNavGrouplogin = ({ item }) => {
  const theme = useTheme();
  // console.log(theme);

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  // console.log(isMatch);
  return (
    <>
      {isMatch ? (
        <>
          <Stack direction="row">
            {item.children?.map((menuItem) => (
              <GravitusNavItemlogin key={menuItem.id} item={menuItem} level={1} />
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="row" spacing={1}>
            {item.children?.map((menuItem) => (
              <GravitusNavItemlogin key={menuItem.id} item={menuItem} level={1} />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

GravitusNavGrouplogin.propTypes = {
  item: PropTypes.object
};

export default GravitusNavGrouplogin;
