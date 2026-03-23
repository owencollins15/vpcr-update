import { Routes } from '@angular/router';
import { PositionDetail } from './position-detail/position-detail';
import { PositionUsers } from './position-users/position-users';
import { PositionOverview } from './position-overview/position-overview';
import { PositionDivision } from './position-division/position-division';
import { PositionSupervisor } from './position-supervisor/position-supervisor';
import { PositionQueues } from './position-queues/position-queues';
import { UserOverview } from './user-overview/user-overview';
import { App } from './app';
import { UserDivision } from './user-division/user-division';
import { UserQueues } from './user-queues/user-queues';
import { UserSupervisor } from './user-supervisor/user-supervisor';
import { UserResponsibilities } from './user-responsibilities/user-responsibilities';

export const routes: Routes = [
  { path: ' ', redirectTo: 'position', pathMatch: 'full' },
  { path: 'position/:id', component: PositionOverview },
  { path: 'position/:id/responsibilities', component: PositionDetail },
  { path: 'position/:id/division', component: PositionDivision },
  { path: 'position/:id/supervisor', component: PositionSupervisor },
  { path: 'position/:id/queues', component: PositionQueues },
  { path: 'position/:id/users', component: PositionUsers },
  { path: 'position/:positionId/user/:userId', component: UserOverview },
  { path: 'position/:positionId/user/:userId/division', component: UserDivision },
  { path: 'position/:positionId/user/:userId/queues', component: UserQueues },
  { path: 'position/:positionId/user/:userId/supervisor', component: UserSupervisor },
  { path: 'position/:positionId/user/:userId/responsibilities', component: UserResponsibilities },
  { path: '**', redirectTo: 'position' },
];
