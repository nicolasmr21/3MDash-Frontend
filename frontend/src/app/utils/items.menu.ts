import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/main/dashboard',
    home: true,
  },
  {
    title: 'Configuración',
    icon: 'settings-2-outline',
    link: '/main/settings',
    home: true,
  },
  {
    title: 'MEDIDAS',
    group: true,
  },
  {
    title: 'Energía activa',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/main/active/matrix',
      },
      {
        title: 'Gráficos',
        link: '/main/active/graphs',
      },
    ],
  },
  {
    title: 'Energía Reactiva',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/main/reactive/matrix',
      },
      {
        title: 'Gráficos',
        link: '/main/reactive/matrix',
      },
    ],
  },
  {
    title: 'Factor de potencia',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/main/power/matrix',
      },
      {
        title: 'Gráficos',
        link: '/main/power/graphs',
      },
    ],
  },
  {
    title: 'Exceso de reactivos',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/main/excess/matrix',
      },
      {
        title: 'Gráficos',
        link: '/main/excess/graphs',
      },
    ],
  },
  {
    title: 'Precios de bolsa',
    icon: 'activity-outline',
    children: [
      {
        title: 'Gráficos',
        link: '/main/prices/graphs',
      },
    ],
  },
  {
    title: 'Energía Inductiva',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/main/inductive/matrix',
      },
      {
        title: 'Gráficos',
        link: '/main/inductive/graphs',
      },
    ],
  },
  {
    title: 'Energía Capacitiva',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/main/capacitive/matrix',
      },
      {
        title: 'Gráficos',
        link: '/main/capacitive/graphs',
      },
    ],
  },
];

export const PROFILE_ITEMS: NbMenuItem[] = [
  {
    title: 'Configuración',
    icon: 'settings-2-outline',
    link: '/main/settings',
  },
  {
    title: 'Cerrar sesión',
    icon: 'log-out-outline',
    link: '/',
  },
];
