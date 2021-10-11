import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { Event } from '@angular/router';


@Component({
  selector: 'app-color-picker-component',
  templateUrl: './color-picker-component.component.html',
  styleUrls: ['./color-picker-component.component.scss']
})
export class ColorPickerComponentComponent implements OnInit {
  @Output() toggleColorPickerEvent = new EventEmitter<boolean>();
  @Output() exportColorEvent = new EventEmitter<string>();
  toggle: boolean = true;
  color:any;
  colorPicked: string = "#E2F019";
  public color6: string = '#0275d8';

 
  constructor() { }

  ngOnInit(): void {
  }

  changeToggleValue(){
    this.toggleColorPickerEvent.emit(false);
  }

  updateColorsArray(){
    this.exportColorEvent.emit(this.color6);
    this.toggleColorPickerEvent.emit(false);
  }

}
