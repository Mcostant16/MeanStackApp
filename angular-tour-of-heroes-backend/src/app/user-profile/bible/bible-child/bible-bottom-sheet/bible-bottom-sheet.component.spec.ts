import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleBottomSheetComponent } from './bible-bottom-sheet.component';

describe('BibleBottomSheetComponent', () => {
  let component: BibleBottomSheetComponent;
  let fixture: ComponentFixture<BibleBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
