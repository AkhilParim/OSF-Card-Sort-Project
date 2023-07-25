import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostDiscardedComponent } from './most-discarded.component';

describe('MostDiscardedComponent', () => {
  let component: MostDiscardedComponent;
  let fixture: ComponentFixture<MostDiscardedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostDiscardedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostDiscardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
