import { describe, it, expect } from 'vitest';
import { HomeComponent } from './features/home/home.component';

describe('HomeComponent', () => {
  it('должен быть создан', () => {
    const component = new HomeComponent();
    expect(component).toBeDefined();
  });

  it('должны быть определены свойства компонента', () => {
    const component = new HomeComponent();
    expect(component).toHaveProperty('home-container');
  });
});
