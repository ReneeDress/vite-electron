// import React from 'react';
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from './pages/routes';
import DefaultLayout from './layout';

const router = createHashRouter([
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
