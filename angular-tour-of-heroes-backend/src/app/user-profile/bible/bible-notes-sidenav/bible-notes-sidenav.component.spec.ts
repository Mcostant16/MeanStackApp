import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleNotesSidenavComponent } from './bible-notes-sidenav.component';

describe('BibleNotesSidenavComponent', () => {
  let component: BibleNotesSidenavComponent;
  let fixture: ComponentFixture<BibleNotesSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleNotesSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleNotesSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
