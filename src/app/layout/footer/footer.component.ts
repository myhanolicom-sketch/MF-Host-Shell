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
      padding: 2rem 2rem 1rem;
      margin-top: auto;
      border-top: 1px solid var(--surface-border);
    }

    .footer-bottom {
      max-width: 1400px;
      margin: 0 auto;
      text-align: center;
      font-size: 0.8rem;
    }

    .footer-bottom p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .footer {
        padding: 1.5rem 1rem;
      }

      .footer-bottom {
        font-size: 0.75rem;
      }
    }

    @media (max-width: 480px) {
      .footer {
        padding: 1rem 0.5rem;
      }

      .footer-bottom p {
        font-size: 0.7rem;
      }
    }
  `]
})
export class FooterComponent {}