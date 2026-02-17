import { Routes } from '@angular/router';
import { App } from './app';
import { PositionDetail } from './position-detail/position-detail';
import { PositionUsers } from './position-users/position-users';

export const routes: Routes = [
  { path: ' ', component: App },
  { path: 'position/:id', component: PositionDetail },
  { path: 'position/:id/users', component: PositionUsers },
];
