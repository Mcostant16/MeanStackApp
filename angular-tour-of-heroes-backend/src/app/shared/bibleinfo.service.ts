import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from "@angular/forms";
import { environment} from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { BibleInfo } from './bible-info.model';

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
    chapter_id: new FormControl(''),
    passage_id: new FormControl(''),
    verse_id: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      profile_id: '',
      bible_id: '',
      books_id: null,
      chapter_id: null,
      passage_id: '',
      verse_id: '',
    });
 }

 optionsSelect = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

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

getbiblePassage(bibleId,chapterId) {
  let params = new HttpParams();
  params = params.append('bible_ID', bibleId);
  params = params.append('chapter_ID', chapterId);
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



}