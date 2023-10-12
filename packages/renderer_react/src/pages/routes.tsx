import { RouteObject } from 'react-router-dom';
import USBDevices from './USBDevices';

export const routes: RouteObject[] = [
  {
    path: '/usb-devices',
    element: <USBDevices />,
  },
];
