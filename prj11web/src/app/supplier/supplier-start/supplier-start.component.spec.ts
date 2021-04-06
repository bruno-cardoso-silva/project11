import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierStartComponent } from './supplier-start.component';

describe('SupplierStartComponent', () => {
  let component: SupplierStartComponent;
  let fixture: ComponentFixture<SupplierStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
