import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header *ngIf="authService.isAuthenticated()" (onToggleSidebar)="toggleSidebar()"></app-header>
      <div class="main-content">
        <app-sidebar *ngIf="authService.isAuthenticated()" [isOpen]="sidebarOpen()"></app-sidebar>
        <div class="content-area" [class.full-width]="!authService.isAuthenticated()">
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer *ngIf="authService.isAuthenticated()"></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--surface-section);
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
    
    .content-area.full-width {
      padding: 0;
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
  sidebarOpen = signal(false);

  constructor(public authService: AuthService) {}

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
}
