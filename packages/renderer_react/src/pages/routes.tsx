import { RouteObject } from 'react-router-dom';
import Home from './Home';
import USBDevices from './USBDevices';

interface CustomRouteObject {
  route: RouteObject;
  menuData?: any;
}

export const customRoutes: CustomRouteObject[] = [
  {
    route: {
      path: '/',
      element: <Home />,
    },
    menuData: {
      label: '首页',
    },
  },
  {
    route: {
      path: '/usb-devices',
      element: <USBDevices />,
    },
    menuData: {
      label: 'USB设备',
    },
  },
];

export const routes: RouteObject[] = customRoutes.map(item => item.route);
