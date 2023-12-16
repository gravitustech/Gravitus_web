import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';

import { socket } from './socket';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setSocketStateAction } from './appRedux/actions/account';
import { initLocalStorage_ng, getConfig_sp } from './utils_ng/localStorage_ng';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const dispatch = useDispatch();
  const localStore = initLocalStorage_ng();

  useEffect(() => {
    socket.on('connect', () => {
      if (socket.connected) {
        console.log('Socket Connected');

        var authenticate = {"userId" : "none"};
        if(getConfig_sp().userId != 'guestUser' && getConfig_sp().token != 'none') {
          authenticate = getConfig_sp();
        }

        socket.emit('authentication', authenticate, (res) => {
          console.log('Socket Authenticated', { res });
        });

        dispatch(
          setSocketStateAction({
            isSocketConnected: true
          })
        );
      }
    });

    socket.on('authenticated', (res) => {
      console.log('User is authenticated - ' + res);
    });

    socket.on('/NOTIFYUpdate/POST', (res) => {
      dispatch(
        setSocketStateAction({
          notifications: res
        })
      );
    });
  }, [socket]);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;