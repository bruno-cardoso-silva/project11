import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutStartComponent } from './check-out-start.component';

describe('CheckOutStartComponent', () => {
  let component: CheckOutStartComponent;
  let fixture: ComponentFixture<CheckOutStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
