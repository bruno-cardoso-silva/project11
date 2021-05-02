import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemOutComponent } from './inventory-item-out.component';

describe('InventoryItemOutComponent', () => {
  let component: InventoryItemOutComponent;
  let fixture: ComponentFixture<InventoryItemOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
