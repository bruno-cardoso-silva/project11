import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppleirItemComponent } from './suppleir-item.component';

describe('SuppleirItemComponent', () => {
  let component: SuppleirItemComponent;
  let fixture: ComponentFixture<SuppleirItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppleirItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppleirItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
