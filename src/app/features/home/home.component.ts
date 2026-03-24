import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="welcome-card">
        <h1>Bienvenido al Sistema MicroFrontends</h1>
        <p class="subtitle">Angular 21 + Module Federation</p>
        
        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">🏗️</div>
            <h3>Arquitectura Modular</h3>
            <p>Aplicaciones desacopladas e independientes con Module Federation</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Componentes Standalone</h3>
            <p>Angular 21 con componentes standalone y Angular Signals</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>PrimeNG UI</h3>
            <p>Componentes profesionales y accesibles con PrimeNG</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">✅</div>
            <h3>Testing</h3>
            <p>Pruebas unitarias con Vitest</p>
          </div>
        </div>
        
        <div class="sections">
          <section>
            <h2>Módulos Disponibles</h2>
            <ul>
              <li>📊 <strong>Admin</strong> - Gestión de administración</li>
              <li>📈 <strong>Dashboard</strong> - Analítica y reportes</li>
            </ul>
          </section>
          
          <section>
            <h2>Tecnologías</h2>
            <ul>
              <li>Angular 21.1.4</li>
              <li>Module Federation (Webpack 5)</li>
              <li>Angular Signals para State Management</li>
              <li>PrimeNG + PrimeFlex + PrimeIcons</li>
              <li>TypeScript 5.5</li>
              <li>Vitest para Testing</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .welcome-card {
      background: white;
      border-radius: 8px;
      padding: 3rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    h1 {
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }
    
    .subtitle {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin: 3rem 0;
    }
    
    .feature-card {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      border-top: 3px solid #3B82F6;
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .feature-card h3 {
      color: #333;
      margin: 1rem 0;
    }
    
    .feature-card p {
      color: #666;
      font-size: 0.95rem;
      margin: 0;
    }
    
    .sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 2rem;
    }
    
    section h2 {
      color: #333;
      border-bottom: 2px solid #3B82F6;
      padding-bottom: 0.5rem;
    }
    
    section ul {
      list-style: none;
      padding: 0;
    }
    
    section li {
      padding: 0.5rem 0;
      color: #555;
    }
    
    @media (max-width: 768px) {
      .welcome-card {
        padding: 1.5rem;
      }
      
      h1 {
        font-size: 1.8rem;
      }
      
      .sections {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}
