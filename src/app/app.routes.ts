import { Routes } from '@angular/router';
import { PositionDetail } from './position-detail/position-detail';
import { PositionUsers } from './position-users/position-users';
import { PositionOverview } from './position-overview/position-overview';

import { PositionSupervisor } from './position-supervisor/position-supervisor';
import { PositionQueues } from './position-queues/position-queues';
import { UserOverview } from './user-overview/user-overview';
import { App } from './app';

import { UserQueues } from './user-queues/user-queues';
import { UserSupervisor } from './user-supervisor/user-supervisor';
import { UserResponsibilities } from './user-responsibilities/user-responsibilities';
import { DivisionComponent } from './division-component/division-component';

export const routes: Routes = [
  { path: ' ', redirectTo: 'position', pathMatch: 'full' },
  { path: 'position/:id', component: PositionOverview },
  { path: 'position/:id/responsibilities', component: PositionDetail },
  { path: 'position/:id/division', component: DivisionComponent },
  { path: 'position/:id/supervisor', component: PositionSupervisor },
  { path: 'position/:id/queues', component: PositionQueues },
  { path: 'position/:id/users', component: PositionUsers },
  { path: 'position/:positionId/user/:userId', component: UserOverview },
  { path: 'position/:positionId/user/:userId/division', component: DivisionComponent },
  { path: 'position/:positionId/user/:userId/queues', component: UserQueues },
  { path: 'position/:positionId/user/:userId/supervisor', component: UserSupervisor },
  { path: 'position/:positionId/user/:userId/responsibilities', component: UserResponsibilities },
  { path: '**', redirectTo: 'position' },
];
