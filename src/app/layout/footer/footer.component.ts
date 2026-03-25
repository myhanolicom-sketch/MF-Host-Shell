import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      
      <div class="footer-bottom">
        <p>&copy; 2026 PENSIONISSSTE. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--primary-color);
      color: white;
      padding: 2rem 0 1rem;
      margin-top: auto;
      border-top: 1px solid var(--surface-border);
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .footer-section h3 {
      margin-bottom: 1rem;
      color: white;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section a {
      color: white;
      text-decoration: none;
    }

    .footer-section a:hover {
      text-decoration: underline;
      color: white;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .footer-bottom {
      text-align: center;
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin-top: 2rem;
    }
  `]
})
export class FooterComponent {}