import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { routes } from './pages/routes.tsx';
import { ConfigProvider } from 'antd';
// import zhCN from 'antd/locale/zh_CN';
import { createTheme, ThemeProvider } from '@mui/material';
import { zhCN } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  zhCN,
);

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ConfigProvider locale={zhCN}><App /></ConfigProvider>,
    element: <App />,
  },
  ...routes,
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
