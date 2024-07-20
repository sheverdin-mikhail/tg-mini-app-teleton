import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers';
import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
