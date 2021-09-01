import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';  // URL to web api
 // private heroesUrl = 'http://192.168.0.21:3000/heroes';  // URL to web on wifi network
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  /*GET heroes from the server */
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  } 
  
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
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  }; 
}
  /*GET hero by id. Will 404 if id not found */
getHero(_id: string): Observable<Hero> {
  const url = `${this.heroesUrl}/${_id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${_id}`)),
    catchError(this.handleError<Hero>(`getHero id=${_id}`))
  );
}

/* PUT: update the hero on the server */
updateHero(hero: Hero): Observable<any> {
  const url = `${this.heroesUrl}/${hero._id}`;
  return this.http.put(url, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero._id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

/* POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero._id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/* DELETE: delete the hero from the server */
deleteHero(_id: string): Observable<Hero> {
  const url = `${this.heroesUrl}/${_id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${_id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  //this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).subscribe( val => console.log(val));
  return this.http.get<Hero[]>(`${this.heroesUrl}/search/${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
  constructor(  private http: HttpClient,
                private messageService: MessageService) { }

  /* Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
}
