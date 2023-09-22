import React from 'react'
import { RouteObject } from 'react-router';
import USBDetection from './USBDetection';

export const routes: RouteObject[] = [
  {
    path: '/usb-detection',
    element: <USBDetection />,
  },
];
