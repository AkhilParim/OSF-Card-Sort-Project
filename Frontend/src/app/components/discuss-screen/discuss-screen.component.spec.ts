import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussScreenComponent } from './discuss-screen.component';

describe('DiscussScreenComponent', () => {
  let component: DiscussScreenComponent;
  let fixture: ComponentFixture<DiscussScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
