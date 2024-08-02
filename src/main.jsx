import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "sonner";
import { persistor, store } from './utils/context/store.jsx';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import appRouter from './routes/routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster richColors position="bottom-right" />
        <PersistGate loading={null} persistor={persistor} >
          <RouterProvider router={appRouter}>
            <App />
          </RouterProvider>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
