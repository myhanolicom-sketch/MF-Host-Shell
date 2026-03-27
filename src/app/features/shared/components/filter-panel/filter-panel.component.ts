import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

export interface FilterOptions {
  startDate?: Date | null;
  endDate?: Date | null;
  states: string[];
  fileTypes: string[];
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule,
    CalendarModule,
    ButtonModule,
    InputTextModule
  ],
  template: `
    <div class="filter-panel" [class.expanded]="isExpanded()">
      <div class="filter-header">
        <h3>Filtros</h3>
        <button class="toggle-btn" (click)="toggleFilter()" [attr.aria-label]="isExpanded() ? 'Cerrar filtros' : 'Abrir filtros'">
          <i class="pi" [ngClass]="isExpanded() ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
        </button>
      </div>

      <form [formGroup]="filterForm" class="filter-content">
        <!-- Date Range Filter -->
        <div class="filter-section">
          <h4 class="filter-title">
            <i class="pi pi-calendar"></i>
            Período de Fechas
          </h4>
          <div class="date-range">
            <div class="date-input">
              <label for="startDate">Desde</label>
              <p-calendar
                formControlName="startDate"
                id="startDate"
                [showIcon]="true"
                dateFormat="dd/mm/yy"
                [inline]="false"
                [responsive]="true"
                [readonlyInput]="false"
                class="w-full"
              ></p-calendar>
            </div>
            <div class="date-input">
              <label for="endDate">Hasta</label>
              <p-calendar
                formControlName="endDate"
                id="endDate"
                [showIcon]="true"
                dateFormat="dd/mm/yy"
                [inline]="false"
                [responsive]="true"
                [readonlyInput]="false"
                class="w-full"
              ></p-calendar>
            </div>
          </div>
        </div>

        <!-- States Filter -->
        <div class="filter-section">
          <h4 class="filter-title">
            <i class="pi pi-filter"></i>
            Estados
          </h4>
          <div class="checkbox-group">
            <div class="checkbox-item" *ngFor="let state of states">
              <p-checkbox
                [(ngModel)]="state.selected"
                [ngModelOptions]="{ standalone: true }"
                [binary]="true"
                (onChange)="onStateChange(state)"
                [inputId]="'state_' + state.value"
              ></p-checkbox>
              <label [for]="'state_' + state.value" class="checkbox-label">
                {{ state.label }}
              </label>
            </div>
          </div>
        </div>

        <!-- File Types Filter -->
        <div class="filter-section">
          <h4 class="filter-title">
            <i class="pi pi-file"></i>
            Tipos de Archivos
          </h4>
          <div class="checkbox-group">
            <div class="checkbox-item" *ngFor="let fileType of fileTypes">
              <p-checkbox
                [(ngModel)]="fileType.selected"
                [ngModelOptions]="{ standalone: true }"
                [binary]="true"
                (onChange)="onFileTypeChange(fileType)"
                [inputId]="'filetype_' + fileType.value"
              ></p-checkbox>
              <label [for]="'filetype_' + fileType.value" class="checkbox-label">
                {{ fileType.label }}
              </label>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="filter-actions">
          <button 
            type="button" 
            class="btn-reset"
            (click)="resetFilters()"
            pButton
            label="Limpiar"
            icon="pi pi-times"
            severity="secondary"
          ></button>
          <button 
            type="button" 
            class="btn-apply"
            (click)="applyFilters()"
            pButton
            label="Aplicar"
            icon="pi pi-check"
          ></button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .filter-panel {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e0e0e0;
      margin-bottom: 2rem;
      transition: all 0.3s ease;
    }

    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
      cursor: pointer;
    }

    .filter-header h3 {
      margin: 0;
      color: #333;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .toggle-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      color: #611232;
      font-size: 1.2rem;
      padding: 0.5rem;
      display: none;
    }

    .toggle-btn:hover {
      color: #7f1d6f;
    }

    .filter-content {
      padding: 1.5rem;
      display: grid;
      gap: 2rem;
    }

    .filter-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .filter-title {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 600;
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-title i {
      color: #611232;
    }

    .date-range {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .date-input {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .date-input label {
      font-size: 0.85rem;
      font-weight: 500;
      color: #555;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .checkbox-item:hover {
      background-color: #f5f5f5;
    }

    .checkbox-label {
      margin: 0;
      font-size: 0.9rem;
      color: #555;
      cursor: pointer;
      user-select: none;
    }

    .filter-actions {
      display: flex;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    .btn-reset,
    .btn-apply {
      flex: 1;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s;
      cursor: pointer;
      border: none;
    }

    .btn-reset {
      background: #f0f0f0;
      color: #333;
    }

    .btn-reset:hover {
      background: #e0e0e0;
    }

    .btn-apply {
      background: linear-gradient(135deg, #611232 0%, #7f1d6f 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(97, 24, 84, 0.3);
    }

    .btn-apply:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(97, 24, 84, 0.4);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .filter-content {
        padding: 1.25rem;
        gap: 1.5rem;
      }

      .date-range {
        gap: 0.75rem;
      }

      .filter-section {
        gap: 0.75rem;
      }
    }

    @media (max-width: 768px) {
      .filter-panel {
        margin-bottom: 1.5rem;
      }

      .filter-header {
        padding: 1.25rem;
      }

      .filter-header h3 {
        font-size: 1rem;
      }

      .toggle-btn {
        display: block;
      }

      .filter-content {
        display: none;
        padding: 1rem;
        gap: 1.5rem;
      }

      .filter-panel.expanded .filter-content {
        display: grid;
      }

      .date-range {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .filter-actions {
        flex-direction: column;
        gap: 0.75rem;
        padding-top: 1rem;
      }

      .btn-reset,
      .btn-apply {
        width: 100%;
      }

      .filter-title {
        font-size: 0.9rem;
      }

      .checkbox-item {
        padding: 0.5rem 0.25rem;
      }

      .checkbox-label {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 480px) {
      .filter-header {
        padding: 1rem;
      }

      .filter-header h3 {
        font-size: 0.95rem;
      }

      .filter-content {
        padding: 0.75rem;
        gap: 1.25rem;
      }

      .filter-section {
        gap: 0.5rem;
      }

      .filter-title {
        font-size: 0.8rem;
      }

      .filter-title i {
        font-size: 0.9rem;
      }

      .checkbox-group {
        gap: 0.5rem;
      }

      .checkbox-item {
        padding: 0.4rem 0.2rem;
        gap: 0.5rem;
      }

      .checkbox-label {
        font-size: 0.8rem;
      }

      .date-input label {
        font-size: 0.75rem;
      }

      .filter-actions {
        padding-top: 0.75rem;
      }

      .btn-reset,
      .btn-apply {
        padding: 0.6rem 1rem;
        font-size: 0.8rem;
      }
    }

    /* PrimeNG Calendar Responsive */
    ::ng-deep .p-calendar {
      width: 100% !important;
    }

    ::ng-deep .p-calendar .p-inputtext {
      width: 100%;
      font-size: 0.9rem;
      padding: 0.5rem;
    }

    ::ng-deep .p-datepicker {
      max-width: 100% !important;
      width: 100% !important;
    }

    @media (max-width: 768px) {
      ::ng-deep .p-datepicker {
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        max-width: 100vw !important;
        border-radius: 16px 16px 0 0;
        z-index: 1000;
      }

      ::ng-deep .p-datepicker .p-datepicker-header {
        padding: 1rem;
      }

      ::ng-deep .p-datepicker .p-datepicker-calendar {
        width: 100%;
        font-size: 0.85rem;
      }

      ::ng-deep .p-datepicker td {
        padding: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      ::ng-deep .p-calendar .p-inputtext {
        font-size: 0.8rem;
        padding: 0.4rem;
      }

      ::ng-deep .p-datepicker {
        font-size: 0.75rem;
      }

      ::ng-deep .p-datepicker .p-datepicker-calendar {
        font-size: 0.75rem;
      }

      ::ng-deep .p-datepicker td {
        padding: 0.35rem;
      }
    }
  `]
})
export class FilterPanelComponent {
  @Output() filtersApplied = new EventEmitter<FilterOptions>();

  isExpanded = signal(true);
  filterForm: FormGroup;

  states = [
    { label: 'Activo', value: 'active', selected: false },
    { label: 'Pendiente', value: 'pending', selected: false },
    { label: 'Completado', value: 'completed', selected: false },
    { label: 'Cancelado', value: 'cancelled', selected: false }
  ];

  fileTypes = [
    { label: 'PDF', value: 'pdf', selected: false },
    { label: 'Excel', value: 'excel', selected: false },
    { label: 'Word', value: 'word', selected: false },
    { label: 'Imagen', value: 'image', selected: false },
    { label: 'Otros', value: 'other', selected: false }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null]
    });
  }

  toggleFilter() {
    this.isExpanded.set(!this.isExpanded());
  }

  onStateChange(state: any) {
    // Handle state change
  }

  onFileTypeChange(fileType: any) {
    // Handle file type change
  }

  applyFilters() {
    const selectedStates = this.states
      .filter(s => s.selected)
      .map(s => s.value);
    
    const selectedFileTypes = this.fileTypes
      .filter(f => f.selected)
      .map(f => f.value);

    const filterOptions: FilterOptions = {
      startDate: this.filterForm.get('startDate')?.value,
      endDate: this.filterForm.get('endDate')?.value,
      states: selectedStates,
      fileTypes: selectedFileTypes
    };

    this.filtersApplied.emit(filterOptions);
  }

  resetFilters() {
    this.filterForm.reset();
    this.states.forEach(s => s.selected = false);
    this.fileTypes.forEach(f => f.selected = false);
    this.filtersApplied.emit({
      states: [],
      fileTypes: []
    });
  }
}
