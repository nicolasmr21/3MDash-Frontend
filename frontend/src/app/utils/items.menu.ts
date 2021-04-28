import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/dashboard',
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
        link: '/active/matrix',
      },
      {
        title: 'Gráficos',
        link: '/active/graphs',
      },
    ],
  },
  {
    title: 'Energía Reactiva',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/reactive/matrix',
      },
      {
        title: 'Gráficos',
        link: '/reactive/matrix',
      },
    ],
  },
  {
    title: 'Factor de potencia',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/power/matrix',
      },
      {
        title: 'Gráficos',
        link: '/power/graphs',
      },
    ],
  },
  {
    title: 'Exceso de reactivos',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/excess/matrix',
      },
      {
        title: 'Gráficos',
        link: '/excess/graphs',
      },
    ],
  },
  {
    title: 'Precios de bolsa',
    icon: 'activity-outline',
    children: [
      {
        title: 'Gráficos',
        link: '/prices/graphs',
      },
    ],
  },
  {
    title: 'Energía Inductiva',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/inductive/matrix',
      },
      {
        title: 'Gráficos',
        link: '/inductive/graphs',
      },
    ],
  },
  {
    title: 'Energía Capacitiva',
    icon: 'activity-outline',
    children: [
      {
        title: 'Matriz',
        link: '/capacitive/matrix',
      },
      {
        title: 'Gráficos',
        link: '/capacitive/graphs',
      },
    ],
  },
];

export const PROFILE_ITEMS: NbMenuItem[] = [
  {
    title: 'Cerrar sesión',
    icon: 'log-out-outline',
    link: '/logout',
  },
];
