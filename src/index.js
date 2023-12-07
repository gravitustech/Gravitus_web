import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'simplebar/src/simplebar.css';
import './assets/third-party/apex-chart.css';

import App from './App';
import { store, persistor } from './appRedux/store';

// Check unused import
// import { store } from 'store';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
// createRoot(container!) if you use TypeScript
const root = createRoot(container); 

root.render(
  <ReduxProvider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </HelmetProvider>
  </ReduxProvider>
);