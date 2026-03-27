/*
  EJEMPLO DE INTEGRACIÓN EN APP.ROUTES.TS
  
  Este archivo muestra cómo integrar los componentes responsivos en tu aplicación.
*/

import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardExampleComponent } from './features/dashboard-example/dashboard-example.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardExampleComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin-remote/admin-remote.component').then(
            (m) => m.AdminRemoteComponent
          ),
      },
      {
        path: 'service',
        loadComponent: () =>
          import('./features/dashboard-remote/dashboard-remote.component').then(
            (m) => m.DashboardRemoteComponent
          ),
      },
    ],
  },
];

/*
  GUÍA DE USO:

  1. COMPONENTE FilterPanelComponent:
     ====================================
     
     import { FilterPanelComponent } from '@app/features/shared/components/filter-panel/filter-panel.component';
     
     @Component({
       selector: 'app-mis-datos',
       imports: [FilterPanelComponent, CommonModule],
       template: `
         <app-filter-panel (filtersApplied)="applyFilters($event)"></app-filter-panel>
         <!-- Tu contenido aquí -->
       `
     })
     export class MiComponente {
       applyFilters(filters: FilterOptions) {
         // Procesar filtros
       }
     }

  2. COMPONENTE DashboardExampleComponent:
     ======================================
     
     Ya está integrado en la ruta '/dashboard'
     Accede a: http://localhost:4200/dashboard

  3. AGREGAR NUEVOS FILTROS:
     =======================
     
     En FilterPanelComponent, modifica:
     
     states = [
       { label: 'Nuevo', value: 'nuevo', selected: false },
     ];
     
     fileTypes = [
       { label: 'Nuevo Tipo', value: 'tipo', selected: false },
     ];

  4. PERSONALIZAR ITEMS DEL DASHBOARD:
     =================================
     
     En DashboardExampleComponent, modifica allItems:
     
     allItems: DashboardItem[] = [
       {
         id: 1,
         name: 'Mi Documento',
         state: 'active',
         fileType: 'pdf',
         date: new Date()
       }
     ];

  5. ESTILOS PERSONALIZADOS:
     =======================
     
     Los colores base están en src/styles.scss:
     
     :root {
       --primary-color: #611232;
       --secondary-color: #8B1F4A;
     }

  BREAKPOINTS DISPONIBLES:
  =======================
  
  @media (max-width: 480px)  - Móvil pequeño
  @media (max-width: 768px)  - Tablet
  @media (max-width: 1024px) - Laptop pequeño
  > 1024px                    - Escritorio

*/
