import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers';
import App from '@/app/App';
import { PassiveIncomeProvider } from './app/providers/PassiveIncomeProvider/PassiveIncomeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <PassiveIncomeProvider>
          <AppRoot>
            <App />
            <div id="app-modals" />
          </AppRoot>
        </PassiveIncomeProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
