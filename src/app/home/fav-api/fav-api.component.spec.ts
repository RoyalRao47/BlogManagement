import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavApiComponent } from './fav-api.component';

describe('FavApiComponent', () => {
  let component: FavApiComponent;
  let fixture: ComponentFixture<FavApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavApiComponent]
    });
    fixture = TestBed.createComponent(FavApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
