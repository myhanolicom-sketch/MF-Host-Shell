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
            🏠 Inicio
          </a>
        </div>
        <div class="nav-item">
          <a routerLink="/admin" routerLinkActive="active">
            📋 Trámites
          </a>
        </div>
        <div class="nav-item">
          <a routerLink="/dashboard" routerLinkActive="active">
            📊 Servicios
          </a>
        </div>
        <div class="nav-item">
          <a href="#contacto">
            📞 Contacto
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: var(--primary-color);
      color: white;
      border-right: 1px solid var(--surface-border, #cccccc);
      padding: 1rem 0;
      transition: all 0.3s ease;
      position: relative;
      overflow-y: auto;
      max-height: calc(100vh - 60px);
      flex-shrink: 0;
    }
    
    .sidebar.closed {
      display: none;
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
      color: white;
      border-left: 3px solid transparent;
      transition: all 0.2s;
      word-break: break-word;
    }
    
    .nav-item a:hover,
    .nav-item a.active {
      background: var(--secondary-color);
      color: white;
      border-left-color: var(--secondary-color);
    }
    
    @media (max-width: 1024px) {
      .sidebar {
        width: 200px;
      }

      .nav-item a {
        padding: 0.875rem 1.25rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 60px;
        height: calc(100vh - 60px);
        z-index: 40;
        box-shadow: 2px 0 8px rgba(0,0,0,0.1);
        width: 200px;
      }

      .sidebar.closed {
        display: none;
        margin-left: -200px;
      }
    }

    @media (max-width: 480px) {
      .sidebar {
        width: 100%;
        max-width: 100vw;
      }

      .nav-item a {
        padding: 0.75rem 1rem;
        font-size: 0.85rem;
      }
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen = true;
}
