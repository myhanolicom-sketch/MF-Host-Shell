import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar" [class.closed]="!isOpen">
      <nav class="nav-menu">
        <div class="nav-item">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            📊 Dashboard
          </a>
        </div>
        <div class="nav-item">
          <a routerLink="/admin" routerLinkActive="active">
            ⚙️ Admin
          </a>
        </div>
        <div class="nav-item">
          <a routerLink="/dashboard" routerLinkActive="active">
            📈 Analytics
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: var(--surface-section, #f8f9fa);
      border-right: 1px solid var(--surface-border, #e9ecef);
      padding: 1rem 0;
      transition: margin-left 0.3s ease;
      position: relative;
      overflow-y: auto;
      max-height: calc(100vh - 60px);
    }
    
    .sidebar.closed {
      margin-left: -250px;
    }
    
    .nav-menu {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    
    .nav-item a {
      display: block;
      padding: 1rem 1.5rem;
      text-decoration: none;
      color: var(--text-color, #333);
      border-left: 3px solid transparent;
      transition: all 0.2s;
    }
    
    .nav-item a:hover,
    .nav-item a.active {
      background: var(--primary-color, #3B82F6);
      color: white;
      border-left-color: var(--primary-color, #3B82F6);
    }
    
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 60px;
        height: calc(100vh - 60px);
        z-index: 50;
        box-shadow: 2px 0 8px rgba(0,0,0,0.1);
      }
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen = true;
}
