import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostImportantComponent } from './most-important.component';

describe('MostImportantComponent', () => {
  let component: MostImportantComponent;
  let fixture: ComponentFixture<MostImportantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostImportantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostImportantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
