import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

const matomoStatus = import.meta.env.VITE_MATOMO_STATUS === 'True';
let instance: ReturnType<typeof createInstance> | undefined;

if (matomoStatus) {
  instance = createInstance({
    urlBase: import.meta.env.VITE_MATOMO_URL_BASE,
    siteId: Number(import.meta.env.VITE_MATOMO_SITE_ID),
    trackerUrl: import.meta.env.VITE_MATOMO_TRACKER_URL,
    srcUrl: import.meta.env.VITE_MATOMO_SRC_URL,
  });
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {matomoStatus && instance ? (
        <MatomoProvider value={instance}>
          <App />
        </MatomoProvider>
      ) : (
        <App />
      )}
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
