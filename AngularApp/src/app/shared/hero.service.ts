import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero.model';
import { $ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
   selectedHero: Hero;
   heroes: Hero [];
   //nodejs heroesController URL
   readonly baseURL = 'http://localhost:3000/heroes';


  constructor(private http : HttpClient) { }

  postHero(hero : Hero){
    return this.http.post(this.baseURL, hero);
  }

  getHeroList(){
    return this.http.get(this.baseURL);
  }

  putHero(hero: Hero) {
    return this.http.put(this.baseURL + `/${hero._id}`, hero);
  }

  deleteHero(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
