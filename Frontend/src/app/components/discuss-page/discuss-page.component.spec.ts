import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussPageComponent } from './discuss-page.component';

describe('DiscussPageComponent', () => {
  let component: DiscussPageComponent;
  let fixture: ComponentFixture<DiscussPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
