import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInEditComponent } from './check-in-edit.component';

describe('CheckInEditComponent', () => {
  let component: CheckInEditComponent;
  let fixture: ComponentFixture<CheckInEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
