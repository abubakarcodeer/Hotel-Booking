import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider, App } from 'antd';
import { store, persistor } from './store';

// Import route tree
import { routeTree } from './routeTree.gen';

// Styles
import './styles.css'; // Primary Tailwind v4 styles
import 'antd/dist/reset.css';

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
});

function AppWrapper({ children }) {
  const { theme } = useSelector((state) => state.app);
  return (
    <ConfigProvider theme={{ token: theme }}>
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </AppWrapper>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
