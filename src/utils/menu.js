import { Icon } from '@iconify/react';

export const SIDENAV_ITEMS = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Charts',
    path: '/charts',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Client Frequency', path: '/charts/client-frequency' }
    ],
  },
];