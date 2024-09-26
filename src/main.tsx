import React from 'react';
import ReactDOM from 'react-dom/client';
// import { AppRoot } from '@telegram-apps/telegram-ui';
import { BrowserRouter } from 'react-router-dom';
// import { StoreProvider } from '@/app/providers';
import App from '@/app/App';
// import { PassiveIncomeProvider } from './app/providers/PassiveIncomeProvider/PassiveIncomeProvider';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://7c2a380cba1ef9a320d5d87e597021a1@o4507741658808320.ingest.de.sentry.io/4507741726900304",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <StoreProvider> */}
        {/* <PassiveIncomeProvider> */}
          {/* <AppRoot> */}
            <App />
            {/* <div id="app-modals" /> */}
          {/* </AppRoot> */}
        {/* </PassiveIncomeProvider> */}
      {/* </StoreProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
);
