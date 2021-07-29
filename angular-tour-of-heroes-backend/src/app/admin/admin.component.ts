import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { User } from '../shared/user.model';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
import * as _ from 'lodash';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public userService: UserService, 
             private router: Router,
             public dialog: MatDialog) { }
 
  // users : User[] = [];
   users;
   user: User;
   //userRecord: User; //use this to create standard record to update database with.
   editField: any;

   departments = [
     {id: 3, value: 'Dep 1'},
     {id: 2, value: 'Dep 2'},
     {id: 3, value: 'Dep 3'}];
    
    roles = [
     {id: 3, value: 'Admin'},
     {id: 2, value: 'User'}];
  

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

    onEdit(user:any) {
      //this.awaitingPersonList.push(this.personList[id]);
      //this.personList.splice(id, 1);
      //this.userRecord = this.userService.selectedUser;
      _.merge(this.userService.selectedUser,user);  //create a record to be injected into the form since some of the fields may  be messing in the database
      console.log(this.userService.selectedUser);
      this.userService.populateForm(this.userService.selectedUser);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(UserFormComponent, dialogConfig);
      
    }

    add() {
      if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(UserFormComponent, dialogConfig);
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
      console.log(user);
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

  onClear() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
  }

}
