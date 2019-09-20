import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMishapComponent } from './details-mishap.component';

describe('DetailsMishapComponent', () => {
  let component: DetailsMishapComponent;
  let fixture: ComponentFixture<DetailsMishapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMishapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMishapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
