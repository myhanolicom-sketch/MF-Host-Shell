import { Component, Output, EventEmitter } from '@angular/core';
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
        <div class="logo">
          <img src="https://framework-gb.cdn.gob.mx/gobmx/img/logo_blanco.svg" alt="Gobierno de México" class="logo-img">
          
        </div>
        <div class="logo">
          
          <h1>PENSIONISSSTE</h1>
        </div>
        <nav class="nav">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/admin">Pantalla de Monitoreo</a></li>
            <li><a href="/dashboard">Administración de Usuarios</a></li>
            
          </ul>
        </nav>
        <div class="actions">
          <button class="logout-btn" (click)="logout()" *ngIf="isAuthenticated()">Cerrar Sesión</button>
          
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
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-img {
      height: 40px;
      width: auto;
    }

    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      color: white;
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
    }
    
    .nav a:hover {
      opacity: 0.8;
    }
    
    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
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
      .nav ul {
        display: none;
      }
      
      .menu-toggle {
        display: block;
      }
    }
  `]
})
export class HeaderComponent {
  @Output() onToggleSidebar = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  onToggle() {
    this.onToggleSidebar.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
