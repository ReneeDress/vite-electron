import { RouteObject } from 'react-router-dom';
import Home from './Home';
import USBDevices from './USBDevices';

interface CustomRouteObject {
  route: RouteObject;
  menuData?: any;
  pageInfo?: any;
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
    pageInfo: {
      title: '首页',
      subtitle: '',
      titleVisibility: false,
    }
  },
  {
    route: {
      path: '/usb-devices',
      element: <USBDevices />,
    },
    menuData: {
      label: 'USB设备',
    },
    pageInfo: {
      title: 'USB设备',
      subtitle: '',
      titleVisibility: true,
    }
  },
];

export const routes: RouteObject[] = customRoutes.map(item => item.route);
