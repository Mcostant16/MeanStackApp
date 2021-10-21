import { Component, OnInit } from '@angular/core';
import { BibleinfoService } from '../../../../../shared/bibleinfo.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  dateToday: number = Date.now();
  constructor(public bibleIS: BibleinfoService) { }

  ngOnInit(): void {
  }

}
