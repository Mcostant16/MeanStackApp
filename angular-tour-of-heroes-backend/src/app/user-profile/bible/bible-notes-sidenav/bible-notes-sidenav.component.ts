import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-bible-notes-sidenav',
  templateUrl: './bible-notes-sidenav.component.html',
  styleUrls: ['./bible-notes-sidenav.component.scss']
})
export class BibleNotesSidenavComponent implements OnInit {
  showFiller = false;
 @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor() { }

  ngOnInit(): void {
  }

  drawerToggle(){
    this.sidenav.toggle();
    alert('hello world');
  }

}
