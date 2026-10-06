import { ConfigProvider, App as AntdApp } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { persistor, store } from './store';
import antTheme from './utils/theme';

import 'antd/dist/reset.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={{ token: antTheme }}>
          <AntdApp>
            <App />
          </AntdApp>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
