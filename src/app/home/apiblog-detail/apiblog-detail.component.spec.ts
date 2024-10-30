import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiblogDetailComponent } from './apiblog-detail.component';

describe('ApiblogDetailComponent', () => {
  let component: ApiblogDetailComponent;
  let fixture: ComponentFixture<ApiblogDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiblogDetailComponent]
    });
    fixture = TestBed.createComponent(ApiblogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
