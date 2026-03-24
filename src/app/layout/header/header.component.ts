import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <h1>🏠 MF Shell</h1>
        </div>
        <nav class="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/admin">Admin</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </nav>
        <button class="menu-toggle" (click)="onToggle()">
          <span class="hamburger">☰</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--primary-color, #3B82F6);
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
    
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
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
    
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
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
  
  onToggle() {
    this.onToggleSidebar.emit();
  }
}
