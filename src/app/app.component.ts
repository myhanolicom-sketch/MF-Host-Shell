import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header *ngIf="loginService.isAuthenticated()" (onToggleSidebar)="toggleSidebar()"></app-header>
      <div class="main-content">
        <app-sidebar *ngIf="loginService.isAuthenticated()" [isOpen]="sidebarOpen()" (toggleMenu)="toggleSidebar()"></app-sidebar>
        <div class="content-area" [class.full-width]="!loginService.isAuthenticated()">
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer *ngIf="loginService.isAuthenticated()"></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--surface-section);
      width: 100%;
      overflow-x: hidden;
    }
    
    .main-content {
      display: flex;
      flex: 1;
      gap: 0;
      width: 100%;
      overflow-x: hidden;
    }
    
    .content-area {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
      overflow-x: hidden;
      min-width: 0;
    }
    
    .content-area.full-width {
      padding: 0;
    }
    
    @media (max-width: 1024px) {
      .content-area {
        padding: 1.5rem;
      }
    }
    
    @media (max-width: 768px) {
      .content-area {
        padding: 1rem;
      }
    }

    @media (max-width: 480px) {
      .content-area {
        padding: 0.75rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'MF Host Shell';
  sidebarOpen = signal(true);

  constructor(public loginService: LoginService) {}

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
}
