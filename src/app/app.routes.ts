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
import { PositionList } from './position-list/position-list';

export const routes: Routes = [
  { path: '', component: UserCreation },
  { path: 'CreateUser', component: UserCreation },
  { path: 'position', component: PositionSelection },
  { path: 'position/:id', component: PositionOverview },
  { path: 'position/:id/responsibilities', component: PositionDetail },
  { path: 'position/:id/division', component: DivisionComponent },
  { path: 'position/:id/supervisor', component: SupervisorComponent },
  { path: 'position/:id/queues', component: QueuesComponent },
  { path: 'position/:id/users', component: PositionUsers },
  { path: 'user/:userId', component: UserOverview },
  { path: 'position/:positionId/user/:userId/division', component: DivisionComponent },
  { path: 'position/:positionId/user/:userId/queues', component: QueuesComponent },
  { path: 'position/:positionId/user/:userId/supervisor', component: SupervisorComponent },
  { path: 'position/:positionId/user/:userId/responsibilities', component: UserResponsibilities },

  { path: 'lou', component: Home },
  { path: 'lou/position', component: PositionList },

  { path: '**', redirectTo: '' },

];
