import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BibleinfoService } from '../../../../../shared/bibleinfo.service';
import { Event } from '@angular/router';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  dateToday: number = Date.now();
  @Output() toggleNoteFormEvent = new EventEmitter<boolean>();
  constructor(public bibleIS: BibleinfoService) { }

  ngOnInit(): void {
  }

  
  changeToggleValue(){
    this.toggleNoteFormEvent.emit(false);
  }

  onSubmit(){
   this.bibleIS.addBibleNote().subscribe(); 
   this.bibleIS.sendClickEvent();
   this.bibleIS.updateNoteForm();
  }

}
