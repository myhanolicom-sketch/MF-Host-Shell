import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <img src="https://framework-gb.cdn.gob.mx/gobmx/img/logo_blanco.svg" alt="Gobierno de México" class="logo-img">
          <h1 class="logo-text">PENSIONISSSTE</h1>
        </div>
        
        <button class="menu-toggle" (click)="toggleMenu()" [class.active]="menuOpen()">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="nav" [class.open]="menuOpen()">
          <ul>
            <li><a href="/" (click)="closeMenu()">Inicio</a></li>
            <li><a href="/admin" (click)="closeMenu()">Pantalla de Monitoreo</a></li>
            <li><a href="/dashboard" (click)="closeMenu()">Administración de Usuarios</a></li>
          </ul>
        </nav>
        
        <div class="actions">
          <button class="logout-btn" (click)="logout()" *ngIf="isAuthenticated()">Salir</button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--primary-color);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .logo-img {
      height: 40px;
      width: auto;
    }

    .logo-text {
      margin: 0;
      font-size: 1.25rem;
      color: white;
      white-space: nowrap;
    }
    
    .menu-toggle {
      display: none;
      flex-direction: column;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      gap: 6px;
      z-index: 101;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(10px, 10px);
    }

    .menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(8px, -8px);
    }
    
    .nav {
      flex: 1;
    }

    .nav ul {
      list-style: none;
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }
    
    .nav a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
      font-size: 0.95rem;
    }
    
    .nav a:hover {
      opacity: 0.8;
    }
    
    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;
    }

    .logout-btn {
      background: var(--secondary-color);
      border: 1px solid var(--secondary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .logout-btn:hover {
      background: #004499;
    }
    
    @media (max-width: 768px) {
      .header-content {
        padding: 0 1rem;
        gap: 1rem;
      }

      .logo-text {
        font-size: 1rem;
      }

      .menu-toggle {
        display: flex;
      }

      .nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--primary-color);
        flex-direction: column;
      }

      .nav.open {
        display: flex;
      }

      .nav ul {
        flex-direction: column;
        gap: 0;
        width: 100%;
      }

      .nav a {
        padding: 1rem;
        display: block;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      .logout-btn {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
      }
    }

    @media (max-width: 480px) {
      .header-content {
        padding: 0 0.5rem;
      }

      .logo-img {
        height: 32px;
      }

      .logo-text {
        font-size: 0.9rem;
      }

      .nav a {
        padding: 0.75rem;
        font-size: 0.85rem;
      }

      .logout-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.75rem;
      }
    }
  `]
})
export class HeaderComponent {
  @Output() onToggleSidebar = new EventEmitter<void>();
  menuOpen = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
