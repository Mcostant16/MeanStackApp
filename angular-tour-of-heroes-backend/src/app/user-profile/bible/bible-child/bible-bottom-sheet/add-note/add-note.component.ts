import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BibleinfoService } from '../../../../../shared/bibleinfo.service';
import { Event } from '@angular/router';
import { NotificationService } from '../../../../../shared/notification.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  dateToday: number = Date.now();
  @Output() toggleNoteFormEvent = new EventEmitter<boolean>();
  constructor(public bibleIS: BibleinfoService, public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  //this is cancel button.
  changeToggleValue(){
    this.toggleNoteFormEvent.emit(false);
   
  }

  onSubmit(){
    if (this.bibleIS.noteForm.valid){
      this.bibleIS.addBibleNote().subscribe(); 
      this.bibleIS.sendClickEvent();
      //this.bibleIS.noteForm.reset();
      //this.bibleIS.updateNoteForm();
      this.notificationService.success('Note made successfully.');
    }
  }

  ngOnDestroy(){
    this.bibleIS.noteForm.controls['_notes'].reset();
    this.bibleIS.noteForm.controls['_title'].reset();
  }

}
