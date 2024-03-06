import { useEffect } from 'react';
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from './pages/routes';
import DefaultLayout from './layout';
import Display from './pages/Display';
import NewMeasurement from './pages/_New/Measurement';
import NewDisplay from './pages/_New/Display';

const router = createHashRouter([
  {
    path: '/',
    element: <NewMeasurement />,
  },
  {
    path: '/display',
    element: <NewDisplay />
  },
  {
    path: '/old/',
    element: <DefaultLayout />,
    children: [...routes],
  },
  {
    path: '/old/display',
    element: <Display />
  },
]);

const App = () => {
  const params = new URLSearchParams(location.search);
  
  useEffect(() => {
    console.log(params.get('electronWindow'));
    if (params.get('electronWindow') === 'Whorl Inspection | Display') {
      location.hash = '/display';
      location.search = '';
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
