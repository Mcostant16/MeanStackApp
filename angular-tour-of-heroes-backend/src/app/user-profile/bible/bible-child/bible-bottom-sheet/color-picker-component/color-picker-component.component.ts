import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { Event } from '@angular/router';
import { BibleinfoService } from '../../../../../shared/bibleinfo.service';


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
  public chosenColor: string = '#0275d8';

 
  constructor(public bibleIS: BibleinfoService) { }

  ngOnInit(): void {
  }

  changeToggleValue(){
    this.toggleColorPickerEvent.emit(false);
  }

  updateColorsArray(){
    //two different ways of sharing data the top 2 lines share through emit from child to parent component 
    //sharing the color selected in color component with bottom sheet and hiding the color picker
    //third line sets the color.
    //fourthline uses the serice to call the grandparent component bible-child to apply style to verses from color picker.
    this.exportColorEvent.emit(this.chosenColor);
    this.toggleColorPickerEvent.emit(false);
    this.bibleIS.setColor(this.chosenColor);
    this.bibleIS.sendClickEvent();
  }

}
