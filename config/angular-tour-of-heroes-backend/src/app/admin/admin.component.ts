import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
 
  // users : User[] = [];
   users;
   user: User;
   editField: any;

    personList: Array<any> = [
      { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
      { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
      { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
    ];

    awaitingPersonList: Array<any> = [
      { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
      { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
      { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
      { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
      { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
    ];

    updateList(_id: string, property: string, event: any) {
     // const editField = event.target.textContent;
      //this.personList[id][property] = editField;
      console.log(_id);
    }

    remove(id: any) {
      this.awaitingPersonList.push(this.personList[id]);
      this.personList.splice(id, 1);
    }

    add() {
      if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
      }
    }

    changeValue(_id: string, property: string, event: any) {
     // this.editField = event.target.textContent;
      console.log(_id);
    }

  
    getUsers(): void {
      this.userService.getUsers()
       .subscribe(res=> {
         this.users = res;
         console.log(res);
       },
       err=> {}
       )
    }
  
    save( user: User, property : string, event: any) {
      const editField = event.target.textContent; 
      user[property] = editField;
      console.log(user);
      console.log(event);
      //console.log(property);
      this.userService.updateUser(user)
        .subscribe();
    }
      

  ngOnInit(): void {
   this.getUsers();
  }

}
