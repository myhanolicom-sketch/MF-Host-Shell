import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AdminRemoteComponent } from './features/admin-remote/admin-remote.component';
import { DashboardRemoteComponent } from './features/dashboard-remote/dashboard-remote.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminRemoteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardRemoteComponent,
    canActivate: [AuthGuard]
  }
];
