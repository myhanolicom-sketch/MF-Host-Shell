import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar" [class.collapsed]="!isOpen" (mouseenter)="expandSidebar()" (mouseleave)="collapseSidebar()" (mousemove)="resetAutoClose()" (click)="resetAutoClose()" (keydown)="resetAutoClose()">
      <div class="sidebar-header">
        <h3 class="sidebar-title" *ngIf="isOpen">Menú</h3>
        <button class="toggle-btn" [title]="isOpen ? 'Contraer menú' : 'Expandir menú'">
          <i class="pi pi-eye"></i>
        </button>
      </div>

      <nav class="nav-menu">
        <div class="nav-section">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item">
            <i class="pi pi-home nav-icon"></i>
            <span class="nav-label" *ngIf="isOpen">Inicio</span>
            <div class="tooltip" *ngIf="!isOpen">Inicio</div>
          </a>

          <a routerLink="/admin" routerLinkActive="active" class="nav-item">
            <i class="pi pi-chart-line nav-icon"></i>
            <span class="nav-label" *ngIf="isOpen">Monitoreo</span>
            <div class="tooltip" *ngIf="!isOpen">Monitoreo</div>
          </a>

          <a routerLinkActive="active" class="nav-item">
            <i class="pi pi-cog nav-icon"></i>
            <span class="nav-label" *ngIf="isOpen">Catalogos</span>
            <div class="tooltip" *ngIf="!isOpen">Servicios</div>
          </a>

          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <i class="pi pi-users nav-icon"></i>
            <span class="nav-label" *ngIf="isOpen">Usuarios</span>
            <div class="tooltip" *ngIf="!isOpen">Usuarios</div>
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    :host {
      --primary-dark: #521247;
      --primary-light: #611232;
      --accent-dark: #7b2e64;
      --accent-light: #b54f92;
      --accent: #8f3d74;
      --accent-deep: #3f1234;
      --sidebar-width: 250px;
      --sidebar-collapsed: 78px;
      --transition-speed: 0.32s;
      --text-primary: #fce8f3;
      --text-secondary: #f0d9e8;
      --text-muted: rgba(247, 219, 235, 0.86);
      --hover-overlay: rgba(203, 120, 157, 0.16);
      --border-color: rgba(203, 120, 157, 0.30);
      --gradient-start: #5a1a3a;
      --gradient-end: #7a2a4a;
      --surface-light: #fff3fb;
      --surface-darker: #3b142b;
    }

    .sidebar {
      width: var(--sidebar-width);
      min-width: var(--sidebar-width);
      background: linear-gradient(180deg, var(--gradient-start), var(--gradient-end));
      color: var(--text-primary);
      border-right: 1px solid var(--border-color);
      padding: 0;
      transition: width var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s, background 0.25s;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: calc(100vh - 60px);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      box-shadow: 8px 0 24px rgba(15, 23, 42, 0.36);
      backdrop-filter: blur(4px);
    }

    .sidebar::before {
      background: 
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 42%),
        radial-gradient(circle at 80% 80%, rgba(255, 206, 237, 0.09) 0%, transparent 48%);
    }

    .sidebar-header {
      background: rgba(30, 41, 59, 0.7);
      border-bottom: 1px solid rgba(148, 163, 184, 0.22);
    }

    .sidebar-title {
      color: #e2e8f0;
      letter-spacing: 0.06em;
    }

    .sidebar::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(155, 34, 71, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(30, 91, 79, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    .sidebar.collapsed {
      width: var(--sidebar-collapsed);
      min-width: var(--sidebar-collapsed);
      max-width: var(--sidebar-collapsed);
      overflow: visible;
    }

    .sidebar.collapsed .sidebar-title {
      opacity: 0;
      visibility: hidden;
      height: 0;
      width: 0;
      pointer-events: none;
    }

    .sidebar.collapsed .nav-label {
      opacity: 0;
      visibility: hidden;
      width: 0;
      margin: 0;
      pointer-events: none;
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1rem;
      border-bottom: 2px solid var(--accent-dark);
      min-height: 80px;
      position: relative;
      background: rgba(0, 0, 0, 0.1);
    }

    .sidebar-title {
      margin: 0;
      font-size: 1.10rem;
      font-weight: 700;
      letter-spacing: 1.2px;
      white-space: nowrap;
      
      text-transform: uppercase;
    }

    .toggle-btn {
      background: linear-gradient(135deg, var(--accent-dark) 0%, var(--accent-light) 100%);
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.6rem 0.65rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      transition: all var(--transition-speed);
      font-size: 1.1rem;
      box-shadow: 0 2px 8px rgba(154, 34, 71, 0.3);
      flex-shrink: 0;
    }

    .toggle-btn:hover {
      background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-dark) 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(154, 34, 71, 0.4);
    }

    .toggle-btn:active {
      transform: translateY(0);
    }

    .toggle-icon {
      display: block;
      transition: transform var(--transition-speed);
      font-weight: bold;
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0.75rem;
    }

    .nav-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.85rem 0.95rem;
      text-decoration: none;
      color: var(--text-muted);
      border-radius: 12px;
      transition: transform var(--transition-speed), background var(--transition-speed), color var(--transition-speed);
      position: relative;
      border-left: 3px solid transparent;
      cursor: pointer;
      overflow: hidden;
      backdrop-filter: blur(1px);
      background: rgba(106, 42, 70, 0.17);
    }

    .nav-item:hover {
      background: rgba(181, 79, 135, 0.30);
      color: #fff;
      transform: translateX(2px);
    }

    .nav-item.active {
      background: rgba(181, 79, 135, 0.35);
      color: #fff;
      font-weight: 700;
      border-left-color: var(--accent-light);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.16);
    }

    .nav-item.active::after {
      background: linear-gradient(180deg, var(--accent), var(--accent-light));
    }

    .nav-item:hover .nav-icon {
      transform: scale(1.15);
    }

    .nav-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(180deg, var(--accent-deep), var(--accent));
      transform: scaleY(0);
      transform-origin: top;
      transition: transform var(--transition-speed);
    }

    .nav-item:hover {
      background: var(--hover-overlay);
      color: var(--text-main);
      transform: translateX(2px);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    .nav-item:hover::before {
      transform: scaleY(1);
    }

    .nav-item.active {
      background: rgba(155, 34, 71, 0.3);
      color: var(--text-main);
      font-weight: 700;
      border-left-color: var(--accent);
      box-shadow: inset 0 0 0 1px rgba(155, 34, 71, 0.25);
    }

    .nav-item.active::before {
      transform: scaleY(1);
    }

    .nav-item.active::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background: linear-gradient(180deg, var(--accent-deep), var(--accent));
      border-radius: 3px 0 0 3px;
    }

    .nav-icon {
      font-size: 1.35rem;
      min-width: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-speed);
      flex-shrink: 0;
    }

    .nav-item:hover .nav-icon {
      transform: scale(1.2) rotate(-5deg);
      filter: drop-shadow(0 2px 4px rgba(155, 34, 71, 0.45));
    }

    .nav-label {
      font-size: 0.95rem;
      white-space: nowrap;
      font-weight: 500;
      transition: all var(--transition-speed);
      color: inherit;
    }

    .tooltip {
      position: absolute;
      left: var(--sidebar-collapsed);
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(135deg, var(--accent-deep) 0%, var(--accent) 100%);
      color: white;
      padding: 0.625rem 0.875rem;
      border-radius: 8px;
      font-size: 0.85rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: all var(--transition-speed);
      z-index: 1000;
      margin-left: 0.75rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      font-weight: 600;
    }

    .tooltip::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-right: 6px solid var(--accent-dark);
    }

    .nav-item:hover .tooltip {
      opacity: 1;
    }

    /* Scrollbar personalizado */
    .nav-menu::-webkit-scrollbar {
      width: 6px;
    }

    .nav-menu::-webkit-scrollbar-track {
      background: transparent;
    }

    .nav-menu::-webkit-scrollbar-thumb {
      background: rgba(155, 34, 71, 0.3);
      border-radius: 3px;
    }

    .nav-menu::-webkit-scrollbar-thumb:hover {
      background: rgba(155, 34, 71, 0.5);
    }

    .nav-menu {
      scrollbar-width: thin;
      scrollbar-color: rgba(155, 34, 71, 0.3) transparent;
    }

    /* Media queries responsivas */
    @media (max-width: 1024px) {
      :host {
        --sidebar-width: 240px;
        --sidebar-collapsed: 70px;
      }

      .sidebar-title {
        font-size: 1rem;
        letter-spacing: 0.8px;
         
      }

      .nav-item {
        padding: 0.8rem 0.75rem;
      }

      .nav-icon {
        font-size: 1.2rem;
      }

      .nav-label {
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
      }

      .sidebar.collapsed {
        transform: translateX(-100%);
      }
    }

    @media (max-width: 480px) {
      :host {
        --sidebar-width: 100vw;
        --sidebar-collapsed: 100vw;
      }

      .sidebar {
        width: 100vw;
      }

      .sidebar.collapsed {
        transform: translateX(-100vw);
      }

      .nav-item {
        padding: 0.85rem 1rem;
      }
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen = true;
  @Output() toggleMenu = new EventEmitter<void>();

  private autoCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly AUTO_CLOSE_MS = 10000;

  ngOnInit() {
    this.manageAutoClose();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      this.manageAutoClose();
    }
  }

  ngOnDestroy() {
    this.clearAutoClose();
  }

  private manageAutoClose() {
    if (this.isOpen) {
      this.resetAutoClose();
    } else {
      this.clearAutoClose();
    }
  }

  resetAutoClose() {
    if (!this.isOpen) {
      return;
    }
    this.clearAutoClose();
    this.autoCloseTimer = setTimeout(() => {
      if (this.isOpen) {
        this.toggleSidebar();
      }
    }, this.AUTO_CLOSE_MS);
  }

  private clearAutoClose() {
    if (this.autoCloseTimer !== null) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  toggleSidebar() {
    this.toggleMenu.emit();
    this.clearAutoClose();
  }

  expandSidebar() {
    if (!this.isOpen) {
      this.toggleMenu.emit();
      this.clearAutoClose(); // No autohide while expanded by hover
    }
  }

  collapseSidebar() {
    if (this.isOpen) {
      this.toggleMenu.emit();
      this.resetAutoClose(); // Start autohide when collapsed
    }
  }
}
