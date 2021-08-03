import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.scss']
})
export class ConfirmWindowComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data,
  //must inject MatDialogRef so the other classes know which MATDIALOG is being referenced
  public dialogref: MatDialogRef<ConfirmWindowComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
  this.dialogref.close(false);
  }
}
