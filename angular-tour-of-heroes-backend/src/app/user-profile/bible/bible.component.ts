import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../../shared/notification.service';
import { Router } from "@angular/router";
import { ThrowStmt, VariableAst } from '@angular/compiler';
import { NgForm } from "@angular/forms";
import { BibleinfoService } from '../../shared/bibleinfo.service';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {
  
  bibleInfo: any; 
  bibleTranslations: any; 
  books: any;
  chapters: any;
 
  
 
  constructor(public BibleinfoService: BibleinfoService) { }

  ngOnInit(): void {
    this.getBibles(); 
    
  }

  bibles = [
   {book_id: 1 , books: 'Genesis'},
   {book_id: 2 , books: 'Mathew'},
   {book_id: 3 , books: 'Mark'},
   {book_id: 4 , books: 'Luke'},
   {book_id: 5 , books: 'John'}
  ]


getbiblePassage(){
  //console.log(this.BibleinfoService.form.value); //get all values of form
  let bible_id = this.BibleinfoService.form.controls.bible_id.value;
  let chapter_id = this.BibleinfoService.form.controls.chapter_id.value;
  this.BibleinfoService.getbiblePassage(bible_id,chapter_id)
  .subscribe(res=> {
    this.bibleInfo = res;
    console.log(res);
  },
  err=> {}
  )
}

getBibles(){
  this.BibleinfoService.getBibles()
  .subscribe(res=> {
    this.bibleTranslations = res;
    console.log(res);
  },
  err=> {}
  )
}

loadBooks(){
  this.BibleinfoService.getBooks()
  .subscribe(res=> {
    this.books = res;
    console.log(res);
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
    console.log(res);
 },
  err=> {}
  )
}


}
