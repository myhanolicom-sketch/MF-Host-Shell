import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AdminRemoteComponent } from './features/admin-remote/admin-remote.component';
import { DashboardRemoteComponent } from './features/dashboard-remote/dashboard-remote.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminRemoteComponent
  },
  {
    path: 'dashboard',
    component: DashboardRemoteComponent
  }
];
