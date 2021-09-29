import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleChildComponent } from './bible-child.component';

describe('CComponent', () => {
  let component: BibleChildComponent;
  let fixture: ComponentFixture<BibleChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
