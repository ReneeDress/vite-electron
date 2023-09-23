import { RouteObject } from 'react-router-dom';
import USBDetection from './USBDetection';

export const routes: RouteObject[] = [
  {
    path: '/usb-detection',
    element: <USBDetection />,
  },
];
