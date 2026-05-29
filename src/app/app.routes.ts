import { Routes } from '@angular/router';
import { PositionDetail } from './position-detail/position-detail';
import { PositionUsers } from './position-users/position-users';
import { PositionOverview } from './position-overview/position-overview';

import { UserOverview } from './user-overview/user-overview';

import { UserResponsibilities } from './user-responsibilities/user-responsibilities';
import { DivisionComponent } from './division-component/division-component';
import { SupervisorComponent } from './supervisor-component/supervisor-component';
import { QueuesComponent } from './queues-component/queues-component';
import { PositionSelection } from './position-selection/position-selection';
import { UserCreation } from './user-creation/user-creation';

import { Home } from './home/home';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home').then((m) => m.Home) },
  {
    path: 'CreateUser',
    loadComponent: () => import('./user-creation/user-creation').then((m) => m.UserCreation),
  },
  {
    path: 'position',
    loadComponent: () =>
      import('./position-selection/position-selection').then((m) => m.PositionSelection),
  },
  {
    path: 'position/:id',
    loadComponent: () =>
      import('./position-overview/position-overview').then((m) => m.PositionOverview),
  },
  {
    path: 'position/:id/responsibilities',
    loadComponent: () => import('./position-detail/position-detail').then((m) => m.PositionDetail),
  },
  {
    path: 'position/:id/division',
    loadComponent: () =>
      import('./division-component/division-component').then((m) => m.DivisionComponent),
  },
  {
    path: 'position/:id/supervisor',
    loadComponent: () =>
      import('./supervisor-component/supervisor-component').then((m) => m.SupervisorComponent),
  },
  {
    path: 'position/:id/queues',
    loadComponent: () =>
      import('./queues-component/queues-component').then((m) => m.QueuesComponent),
  },
  {
    path: 'position/:id/users',
    loadComponent: () => import('./position-users/position-users').then((m) => m.PositionUsers),
  },
  {
    path: 'user/:userId',
    loadComponent: () => import('./user-overview/user-overview').then((m) => m.UserOverview),
  },
  {
    path: 'position/:positionId/user/:userId/division',
    loadComponent: () =>
      import('./division-component/division-component').then((m) => m.DivisionComponent),
  },
  {
    path: 'position/:positionId/user/:userId/queues',
    loadComponent: () =>
      import('./queues-component/queues-component').then((m) => m.QueuesComponent),
  },
  {
    path: 'position/:positionId/user/:userId/supervisor',
    loadComponent: () =>
      import('./supervisor-component/supervisor-component').then((m) => m.SupervisorComponent),
  },
  {
    path: 'position/:positionId/user/:userId/responsibilities',
    loadComponent: () =>
      import('./user-responsibilities/user-responsibilities').then((m) => m.UserResponsibilities),
  },

  { path: '**', redirectTo: '' },
];
