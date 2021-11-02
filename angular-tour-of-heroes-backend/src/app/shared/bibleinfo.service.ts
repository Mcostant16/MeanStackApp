import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from "@angular/forms";
import { environment} from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators,  } from '@angular/forms';
import { BibleInfo } from './bible-info.model';
import { Colors } from './color-profile.model';
import { Note } from './user-note.model';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BibleBottomSheetComponent } from '../user-profile/bible/bible-child/bible-bottom-sheet/bible-bottom-sheet.component';

@Injectable({
  providedIn: 'root'
})
export class BibleinfoService {



  selectedBibleInfo: BibleInfo = {
    _id: '',
    profile_id: '',
    bible_id: '',
    books_id: '',
    chapter_id: '',
    passage_id: '',
    verse_id: '' 
  };

  userNote: Note = {
    note_id: '',
    _profile_id: '',
    _bible_id: '',
    _book_id: '',
    _chapter_id: '',
    reference: '',
    _verses: [],
    _date: '',
    _title: '',
    _notes: '',
  }

  
  userColors: Colors = {
    _id: '',
    profile_id: '',
    color1: 'YELLOW',
    color2: 'LIGHTBLUE',
    color3: 'PLUM',
    color4: 'LAVENDER',
    color5: 'PALEGREEN',
    color6: 'CHARTREUSE',
    color7: 'ORANGE',
    color8: 'SALMON',
    color9: 'LIGHTCYAN',
    color10: 'PINK'
};
public updateColor: string;
private colorSource = new BehaviorSubject<Colors>(this.userColors);
currentColor = this.colorSource.asObservable();
private noteSource = new BehaviorSubject<Note>(this.userNote);
addNote$ = this.noteSource.asObservable();
private subject = new Subject<any>();
public noteChapters; 
//public bookChapter: string;
public verseArray: string [] = [];
private word: string = 'color';
private x: number =  1;
public bottomSheetRef: MatBottomSheetRef;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'}) };

constructor(public http: HttpClient) { }

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    profile_id: new FormControl('' ,Validators.required),
    bible_id: new FormControl(''),
    books_id: new FormControl(''),
    chapter_id: new FormControl([]),
    passage_id: new FormControl(''),
    verse_id: new FormControl('')
  });

  noteForm: FormGroup = new FormGroup({
    _profile_id: new FormControl(null),
    _title: new FormControl(null),
   // _verses: new FormControl({value: null, disabled: true}, Validators.required),
    _verses: new FormControl({value: '',}),
    _date: new FormControl(''),
    _notes: new FormControl('', Validators.required),
    _bible_id: new FormControl(''),
    _books_id: new FormControl(''),
    _chapter_id: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      profile_id: '',
      bible_id: '',
      books_id: null,
      chapter_id: [],
      passage_id: '',
      verse_id: '',
    });
 }

 optionsSelect = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

bibleId: string;
chapterId:string;
    /*
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  }; 
}

//don't need the variables decided to get Json of form control
getbiblePassage(/*bibleId,chapterId*/) {
  //get the form control and turn json back in an object
  this.noteChapters = JSON.parse(this.form.get('chapter_id').value);
  //this.bibleId = bibleId; ////set bibleId to save highlights
 // this.chapterId = chapterId; //set chapterId to save highlights
 //need elvis operator because bottomSheetRef does not exist until verse is clicked and throws error.
 this.bottomSheetRef?.dismiss(); 
 this.updateNoteForm();
  let params = new HttpParams();
  params = params.append('bible_ID', this.noteChapters.bibleId);
  params = params.append('chapter_ID', this.noteChapters.id);
  //console.log(this.noteChapters.reference);
  return this.http.get(environment.apiBaseUrl + '/biblePassage',{ params: params});
}

getBibles() {
  return this.http.get(environment.apiBaseUrl + '/bibles');
}

getBooks() {
  return this.http.get(environment.apiBaseUrl + '/books');
}

getChapters(bibleId, bookId) {
  //use HttpParams to append parameters to pass to query string on backend to retrieve correct chapters
  let params = new HttpParams();
  params = params.append('bible_ID', bibleId);
  params = params.append('books_ID', bookId);
  return this.http.get(environment.apiBaseUrl + '/chapters',{ params: params});
 }

//going to use this to save info about user bible info
saveAccountInfo(bibleId,chapterId) {
  this.bibleId = bibleId; ////set bibleId to save highlights
  this.chapterId = chapterId; //set chapterId to save highlights
  let params = new HttpParams();
  params = params.append('bible_ID', bibleId);
  params = params.append('chapter_ID', chapterId);
  return this.http.get(environment.apiBaseUrl + '/biblePassage',{ params: params});
}

setColor(selectedColor: string){
  this.updateColor = selectedColor;
}


sendClickEvent(){
  this.subject.next();
}

sendAddNoteClickEvent(){
  this.subject.next();
}

getClickEvent(): Observable<any>{
  return this.subject.asObservable();
}

getAddNoteClickEvent(): Observable<any>{
  return this.subject.asObservable();
}


setNote(data){

  this.noteSource.next(data);
}

updateNoteForm() {
 //update note model to send parameterms
 this.noteForm.controls['_notes'].reset(); //had to keep this here to keep form from doing error even though it's in the ngdestroy of bible bottom sheet component...
  this.noteForm.setValue({
    _profile_id: this.getUserPayLoad()._id,
    _title: '',
    _verses:'',
    _date:  Date.now(),
    _notes: '',
    _bible_id: this.noteChapters.bibleId,
    _books_id: this.noteChapters.bookId,
    _chapter_id: this.noteChapters.id,
  });
  //clear verse array of any previous verse that may not have been submitted.
 // this.verseArray = []; 
}

updateVerseArray() {
  const arr = this.verseArray.map(element => parseInt(element.split('.').pop()));
  let sortedArray = arr.sort(function(a, b) {return a - b;});
  var consecArr = [];
  const myArray = [];

//algorithim to add consecutive verses together to be Bible Verse Notes.
  for (let i=0, j=1; i < sortedArray.length; i++, j++ ) {
    // if numbers are consecutive
      if ((sortedArray[j] - sortedArray[i]) == 1) {  
          consecArr.push(sortedArray[i], sortedArray[j]);
      }
      else {
        // if number does not have a consecutive number following it store the single number.
           if (consecArr.length === 0) {
              myArray.push(sortedArray[i]);
           }
           else {
            // else store the min and max of number array removing all other consecutive numbers.
              myArray.push(Math.min(...consecArr) + '-' + Math.max(...consecArr));
           }
           // initialize consecArr back to empty and repeat process for verses that are consecutive
           consecArr = [];
        }
    }
  //update noteForm verses with myArray to show shortened list of consecutive and individual verses.
  this.noteForm.patchValue({
    _verses: this.noteChapters.reference + ': V. ' + myArray});
 // console.log(this.noteForm);
}


//update users color profile
updateHighLightColors(color: string){
  //console.log(color);
  this.userColors[this.word + this.x] = color;
  this.setColor(color);
 //this.profileColors[4] = color;
 //console.log(this.profileColors[this.word +this.x]);
 //if last color has been update reset cplor
 this.x === 10 ? this.x=1 : this.x++ ;

}

getToken() {
  return localStorage.getItem('token');
}


getUserPayLoad() {
  var token = this.getToken();
  if (token) {
    var userPayLoad = atob(token.split('.')[1]);
   return JSON.parse(userPayLoad);
  }
  else 
    return null;
}

addBibleNote(): Observable<any>{
  return this.http.post(environment.apiBaseUrl + '/addNote', this.noteForm.value, this.noAuthHeader).pipe(
    tap(_ => console.log(`updated hero id=${this.noteForm.value._profile_id}`)),
    catchError(this.handleError<any>('addBibleNote'))
  );
}

getNotes(): Observable<any>{

  let params = new HttpParams();
  params = params.append('profile_ID', this.getUserPayLoad()._id);
  return this.http.get(environment.apiBaseUrl + '/notes', { params: params}).pipe(
    tap(_ => console.log(`got notes for profile=${this.getUserPayLoad()._id}`)),
    catchError(this.handleError<any>('getNotes'))
  );
}

}
