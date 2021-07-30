import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { rank: 11, name: 'Dr Nice' },
      { rank: 12, name: 'Narco' },
      { rank: 13, name: 'Bombasto' },
      { rank: 14, name: 'Celeritas' },
      { rank: 15, name: 'Magneta' },
      { rank: 16, name: 'RubberMan' },
      { rank: 17, name: 'Dynama' },
      { rank: 18, name: 'Dr IQ' },
      { rank: 19, name: 'Magma' },
      { rank: 20, name: 'Tornado' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.rank)) + 1 : 11;
  }
}