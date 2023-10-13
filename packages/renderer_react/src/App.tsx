// import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './pages/routes';
import DefaultLayout from './layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [...routes],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
