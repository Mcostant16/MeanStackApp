import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { MatToolbarModule }  from '@angular/material/toolbar';
import  { MatGridListModule }  from '@angular/material/grid-list';
import  { MatFormFieldModule }  from '@angular/material/form-field';
import  { MatInputModule }  from '@angular/material/input';
import  { MatRadioModule }  from '@angular/material/radio';
import  { MatSelectModule }  from '@angular/material/select';
import  { MatDatepickerModule }  from '@angular/material/datepicker';
import  { MatCheckboxModule }  from '@angular/material/checkbox';
import  { MatNativeDateModule }  from '@angular/material/core';
import  { MatButtonModule }  from '@angular/material/button';
import  { MatDialogModule }  from '@angular/material/dialog';



@NgModule({

  imports: [
    CommonModule,
	 MatToolbarModule,
   MatGridListModule,
   MatFormFieldModule,
   MatInputModule,
   MatRadioModule,
   MatSelectModule ,
   MatDatepickerModule,
   MatCheckboxModule,
   MatNativeDateModule,
   MatButtonModule,
   MatDialogModule,
],
  exports: [
	  MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule ,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
	],
  declarations: []
})
export class MaterialModule { }
