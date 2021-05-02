import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInStartComponent } from './check-in-start.component';

describe('CheckInStartComponent', () => {
  let component: CheckInStartComponent;
  let fixture: ComponentFixture<CheckInStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
