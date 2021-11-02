import { AfterViewChecked, Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NotificationService } from '../../shared/notification.service';
import { Router } from "@angular/router";
import { ThrowStmt, VariableAst } from '@angular/compiler';
import { NgForm } from "@angular/forms";
import { BibleinfoService } from '../../shared/bibleinfo.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml} from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss'],
  //encapsulation: ViewEncapsulation.None
})

export class BibleComponent implements OnInit {
  bibleInfo: SafeHtml;
  bibleHtmlData: any; 
  bibleTranslations: any; 
  profileNotes: any; 
  books: any;
  chapters: any;
  clickEventsubscription:Subscription;
  
  constructor(public BibleinfoService: BibleinfoService, private sanitizer: DomSanitizer) {
    this.clickEventsubscription = this.BibleinfoService.getAddNoteClickEvent().subscribe( ()=> {
      this.getProfileNotes();
    })
  }

  ngOnInit(): void {
    this.getBibles(); 
    this.getProfileNotes();
    //this.getbiblePassage();
    //this.bibleInfo = this.sanitizer.bypassSecurityTrustHtml('<button type="button" id="submitButton"  class="newAwesomeClass (click)="showmessage()">Button</button>');
    }
  
    longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
      from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
     originally bred for hunting.`;

  bibles = [
   {book_id: 1 , books: 'Genesis'},
   {book_id: 2 , books: 'Mathew'},
   {book_id: 3 , books: 'Mark'},
   {book_id: 4 , books: 'Luke'},
   {book_id: 5 , books: 'John'}
  ]


getbiblePassage(){
  //console.log(this.BibleinfoService.form.value); //get all values of form
  //let bible_id = this.BibleinfoService.form.controls.bible_id.value;
  //let chapter_id = this.BibleinfoService.form.controls.chapter_id.value.id;
  //this.BibleinfoService.getbiblePassage('06125adad2d5898a-01','EXO.1')
  this.BibleinfoService.getbiblePassage(/*bible_id, chapter_id*/)
  .subscribe(res=> {
  this.bibleHtmlData = res;
    //console.log(res);
    this.bibleInfo = this.sanitizer.bypassSecurityTrustHtml('<a [routerLink]="" class="newAwesomeClass" (click)="showmessage()">'+ this.bibleHtmlData.data.content + '</a>');
 },
  err=> {}
  )
}



getBibles(){
  this.BibleinfoService.getBibles()
  .subscribe(res=> {
    this.bibleTranslations = res;
  //  console.log(res);
  },
  err=> {}
  )
}

loadBooks(){
  this.BibleinfoService.getBooks()
  .subscribe(res=> {
    this.books = res;
   // console.log(res);
 },
  err=> {}
  )
}

loadChapters(){
  let bible_id = this.BibleinfoService.form.controls.bible_id.value;
  let books_id = this.BibleinfoService.form.controls.books_id.value;
  this.BibleinfoService.getChapters(bible_id,books_id)
  .subscribe(res=> {
    this.chapters = res;
 },
  err=> {}
  )
}

addClickEvent() {

}

getProfileNotes(){
  this.BibleinfoService.getNotes()
  .subscribe(res=> {
    this.profileNotes = res;
  },
  err=> {}
  )
}


}


