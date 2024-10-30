import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiBlogComponent } from './api-blog.component';

describe('ApiBlogComponent', () => {
  let component: ApiBlogComponent;
  let fixture: ComponentFixture<ApiBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiBlogComponent]
    });
    fixture = TestBed.createComponent(ApiBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
