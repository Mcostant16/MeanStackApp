import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../shared/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(public userService: UserService, public notificationService : NotificationService, public router: Router, public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  departments = [
    {id: 3, value: 'Dep 1'},
    {id: 2, value: 'Dep 2'},
    {id: 3, value: 'Dep 3'}];
   
   roles = [
    {id: 3, value: 'Admin'},
    {id: 2, value: 'User'}];

  ngOnInit(): void {
  }

  onClear() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
  }

  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
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

  onSubmit() {
    if (this.userService.form.valid) {
      //this.userService.insertEmployee(this.userService.form.value);
      this.userService.updateUser(this.userService.form.value).subscribe();
      console.log(this.userService.form.value);
      this.userService.form.reset();
      this.userService.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
    }
  }

}
