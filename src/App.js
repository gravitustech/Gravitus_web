
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';

import { socket } from './socket';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setSocketStateAction } from './appRedux/actions/account';
import { initLocalStorage_ng } from './utils_ng/localStorage_ng';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const dispatch = useDispatch();
  const localStore = initLocalStorage_ng();
  
  useEffect(() => {
    socket.on('connect', () => {
      if (socket.connected) {
        console.log('socket connected');
        const authenticate = { userId: '8203038', Token: 'Set Token' };
        
        socket.emit('authentication', authenticate, (resp) => {
          console.log('socket authenticated', { resp });
        });
        
        dispatch(
          setSocketStateAction({
            isSocketConnected: true
          })
        );
      }
    });

    socket.on('/NOTIFYUpdate/POST', (notify) => {
      dispatch(
        setSocketStateAction({
          notifications: notify
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