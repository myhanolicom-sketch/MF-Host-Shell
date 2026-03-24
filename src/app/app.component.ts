import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="app-container">
      <app-header (onToggleSidebar)="toggleSidebar()"></app-header>
      <div class="main-content">
        <app-sidebar [isOpen]="sidebarOpen()"></app-sidebar>
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--surface-ground);
    }
    
    .main-content {
      display: flex;
      flex: 1;
      gap: 0;
    }
    
    .content-area {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }
    
    @media (max-width: 768px) {
      .content-area {
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'MF Host Shell';
  sidebarOpen = signal(true);

  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }
}
