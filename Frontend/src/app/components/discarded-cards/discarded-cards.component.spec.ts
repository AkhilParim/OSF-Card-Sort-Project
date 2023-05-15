import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardedCardsComponent } from './discarded-cards.component';

describe('DiscardedCardsComponent', () => {
  let component: DiscardedCardsComponent;
  let fixture: ComponentFixture<DiscardedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardedCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscardedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
