import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent, FilterOptions } from '../shared/components/filter-panel/filter-panel.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface DashboardItem {
  id: number;
  name: string;
  state: string;
  fileType: string;
  date: Date;
}

@Component({
  selector: 'app-dashboard-example',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, TableModule, ButtonModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard de Documentos</h1>
        <p>Administra y visualiza tus archivos</p>
      </div>

      <!-- Filter Panel -->
      <app-filter-panel (filtersApplied)="onFiltersApplied($event)"></app-filter-panel>

      <!-- Content Section -->
      <div class="content-section">
        <div class="section-header">
          <h2>Documentos ({{ filteredItems().length }})</h2>
          <button pButton label="Exportar" icon="pi pi-download" severity="secondary"></button>
        </div>

        <!-- Items Grid -->
        <div class="items-grid" *ngIf="filteredItems().length > 0; else noItems">
          <div class="item-card" *ngFor="let item of filteredItems()">
            <div class="item-header">
              <i [ngClass]="getFileIcon(item.fileType)"></i>
              <span class="item-type">{{ item.fileType | uppercase }}</span>
            </div>
            <h3 class="item-name">{{ item.name }}</h3>
            <div class="item-meta">
              <span class="meta-item">
                <i class="pi pi-tag"></i>
                {{ item.state }}
              </span>
              <span class="meta-item">
                <i class="pi pi-calendar"></i>
                {{ item.date | date: 'dd/MM/yyyy' }}
              </span>
            </div>
            <div class="item-actions">
              <button pButton icon="pi pi-download" [rounded]="true" severity="success"></button>
              <button pButton icon="pi pi-eye" [rounded]="true"></button>
              <button pButton icon="pi pi-trash" [rounded]="true" severity="danger"></button>
            </div>
          </div>
        </div>

        <!-- No Items Message -->
        <ng-template #noItems>
          <div class="no-items">
            <i class="pi pi-inbox"></i>
            <p>No se encontraron documentos con los filtros seleccionados</p>
            <button pButton label="Limpiar filtros" icon="pi pi-times"></button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      margin: 0;
      color: #333;
      font-size: 2rem;
      font-weight: 700;
    }

    .dashboard-header p {
      margin: 0.5rem 0 0;
      color: #666;
      font-size: 1rem;
    }

    .content-section {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e0e0e0;
    }

    .section-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .item-card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .item-card:hover {
      border-color: #611232;
      box-shadow: 0 4px 16px rgba(97, 24, 84, 0.15);
      transform: translateY(-2px);
    }

    .item-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .item-header i {
      font-size: 2rem;
      color: #611232;
    }

    .item-type {
      background: #f5f5f5;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #666;
    }

    .item-name {
      margin: 0;
      color: #333;
      font-size: 1rem;
      font-weight: 600;
      word-break: break-word;
    }

    .item-meta {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #666;
    }

    .meta-item i {
      color: #611232;
    }

    .item-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }

    .no-items {
      text-align: center;
      padding: 3rem 2rem;
    }

    .no-items i {
      font-size: 4rem;
      color: #ddd;
      display: block;
      margin-bottom: 1rem;
    }

    .no-items p {
      margin: 0 0 1.5rem;
      color: #999;
      font-size: 1rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .items-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.25rem;
      }

      .content-section {
        padding: 1.5rem;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .dashboard-header h1 {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 0;
      }

      .dashboard-header {
        margin-bottom: 1.5rem;
        padding: 1rem;
      }

      .dashboard-header h1 {
        font-size: 1.5rem;
      }

      .dashboard-header p {
        font-size: 0.9rem;
      }

      .content-section {
        padding: 1rem;
        border-radius: 0;
        margin: 0;
        box-shadow: none;
      }

      .section-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
      }

      .section-header h2 {
        width: 100%;
        font-size: 1.25rem;
      }

      .section-header button {
        width: 100%;
      }

      .items-grid {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
      }

      .item-card {
        padding: 1rem;
        gap: 0.75rem;
      }

      .item-header i {
        font-size: 1.5rem;
      }

      .item-name {
        font-size: 0.9rem;
      }

      .meta-item {
        font-size: 0.75rem;
      }

      .item-actions {
        gap: 0.35rem;
      }
    }

    @media (max-width: 480px) {
      .dashboard-header {
        padding: 0.75rem;
        margin-bottom: 1rem;
      }

      .dashboard-header h1 {
        font-size: 1.25rem;
      }

      .dashboard-header p {
        font-size: 0.8rem;
      }

      .content-section {
        padding: 0.75rem;
        border-radius: 0;
      }

      .section-header {
        gap: 0.5rem;
        padding-bottom: 0.75rem;
        margin-bottom: 1rem;
      }

      .section-header h2 {
        font-size: 1rem;
      }

      .items-grid {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }

      .item-card {
        padding: 0.75rem;
        gap: 0.5rem;
      }

      .item-header {
        gap: 0.5rem;
      }

      .item-header i {
        font-size: 1.25rem;
      }

      .item-type {
        font-size: 0.65rem;
        padding: 0.2rem 0.5rem;
      }

      .item-name {
        font-size: 0.85rem;
      }

      .item-meta {
        gap: 0.75rem;
      }

      .meta-item {
        font-size: 0.7rem;
      }

      .item-actions button {
        padding: 0.4rem;
      }

      .no-items {
        padding: 2rem 1rem;
      }

      .no-items i {
        font-size: 3rem;
      }

      .no-items p {
        font-size: 0.9rem;
      }
    }
  `]
})
export class DashboardExampleComponent {
  private currentFilters = signal<FilterOptions | null>(null);

  allItems: DashboardItem[] = [
    {
      id: 1,
      name: 'Informe Mensual Q1 2026',
      state: 'active',
      fileType: 'pdf',
      date: new Date(2026, 0, 15)
    },
    {
      id: 2,
      name: 'Presupuesto 2026',
      state: 'pending',
      fileType: 'excel',
      date: new Date(2026, 0, 20)
    },
    {
      id: 3,
      name: 'Contrato Proveedor ABC',
      state: 'completed',
      fileType: 'word',
      date: new Date(2026, 0, 10)
    },
    {
      id: 4,
      name: 'Logo Empresa',
      state: 'active',
      fileType: 'image',
      date: new Date(2026, 0, 25)
    },
    {
      id: 5,
      name: 'Manual de Procedimientos',
      state: 'completed',
      fileType: 'pdf',
      date: new Date(2026, 0, 5)
    },
    {
      id: 6,
      name: 'Reporte de Ventas',
      state: 'pending',
      fileType: 'excel',
      date: new Date(2026, 0, 22)
    }
  ];

  filteredItems = signal<DashboardItem[]>(this.allItems);

  onFiltersApplied(filters: FilterOptions) {
    this.currentFilters.set(filters);
    this.applyFilters();
  }

  private applyFilters() {
    const filters = this.currentFilters();
    let filtered = [...this.allItems];

    if (filters) {
      // Filter by date range
      if (filters.startDate) {
        filtered = filtered.filter(item => item.date >= filters.startDate!);
      }
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter(item => item.date <= endDate);
      }

      // Filter by states
      if (filters.states.length > 0) {
        filtered = filtered.filter(item => filters.states.includes(item.state));
      }

      // Filter by file types
      if (filters.fileTypes.length > 0) {
        filtered = filtered.filter(item => filters.fileTypes.includes(item.fileType));
      }
    }

    this.filteredItems.set(filtered);
  }

  getFileIcon(fileType: string): string {
    const icons: { [key: string]: string } = {
      pdf: 'pi pi-file-pdf',
      excel: 'pi pi-file-excel',
      word: 'pi pi-file-word',
      image: 'pi pi-image',
      other: 'pi pi-file'
    };
    return icons[fileType] || icons.other;
  }
}
