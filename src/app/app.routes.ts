import { Routes } from '@angular/router';
import { PositionDetail } from './position-detail/position-detail';
import { PositionUsers } from './position-users/position-users';
import { PositionOverview } from './position-overview/position-overview';
import { PositionDivision } from './position-division/position-division';
import { PositionSupervisor } from './position-supervisor/position-supervisor';
import { PositionQueues } from './position-queues/position-queues';
import { App } from './app';

export const routes: Routes = [
  { path: ' ', redirectTo: 'positions', pathMatch: 'full' },
  { path: 'position/:id', component: PositionOverview },
  { path: 'position/:id/responsibilities', component: PositionDetail },
  { path: 'position/:id/division', component: PositionDivision },
  { path: 'position/:id/supervisor', component: PositionSupervisor },
  { path: 'position/:id/queues', component: PositionQueues },
  { path: 'position/:id/users', component: PositionUsers },
  { path: '**', redirectTo: 'positions' },
];
