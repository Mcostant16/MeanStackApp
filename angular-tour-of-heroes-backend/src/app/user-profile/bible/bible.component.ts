import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification.service';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
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


getBible(){
  this.BibleinfoService.getBible()
  .subscribe(res=> {
    this.bibleInfo = res;
    console.log(res);
  //  console.log(this.bibleInfo.data.content);
  },
  err=> {}
  )
}

getBibles(){
  this.BibleinfoService.getBibles()
  .subscribe(res=> {
    this.bibleTranslations = res;
    console.log(res);
 //   console.log(this.bibleTranslations.data.content);
  },
  err=> {}
  )
}

loadBooks(event){
  this.BibleinfoService.getBooks()
  .subscribe(res=> {
    this.books = res;
    console.log(res);
 },
  err=> {}
  )
}

loadChapters(event){
  this.BibleinfoService.getChapters()
  .subscribe(res=> {
    this.chapters = res;
    console.log(res);
 },
  err=> {}
  )
}


}
