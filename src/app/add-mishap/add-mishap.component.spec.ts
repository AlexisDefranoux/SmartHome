import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMishapComponent } from './add-mishap.component';

describe('AddMishapComponent', () => {
  let component: AddMishapComponent;
  let fixture: ComponentFixture<AddMishapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMishapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMishapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
