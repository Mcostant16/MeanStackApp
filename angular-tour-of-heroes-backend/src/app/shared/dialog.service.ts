import {ConfirmWindowComponent} from './../confirm-window/confirm-window.component'
import { Injectable } from '@angular/core';
import  { MatDialog }  from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg){
    //return observable that has properties afterClose used to subscribe
    // in the admin.component type script file.
    return this.dialog.open(ConfirmWindowComponent, { 
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data : {
        message : msg
      }
    });
  }
}
