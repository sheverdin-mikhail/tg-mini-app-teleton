import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers';
import App from '@/app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <AppRoot>
          <App />
          <div id="app-modals" />
        </AppRoot>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
