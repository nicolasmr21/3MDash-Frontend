import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Configuración',
    icon: 'settings-2-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MATRICES',
    group: true,
  },
  {
    title: 'Energía activa',
    icon: 'activity-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
    ],
  },
];
