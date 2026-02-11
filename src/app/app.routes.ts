import { Routes } from '@angular/router';
import { App } from './app';
import { PositionDetail } from './position-detail/position-detail';

export const routes: Routes = [
    {path: ' ', component: App },
    { path:'position/:id', component:PositionDetail}
];
