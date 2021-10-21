import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
//import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
//import { User } from '../../shared/user.model';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { BibleinfoService } from '../../../../shared/bibleinfo.service';
import { Colors } from '../../../../shared/color-profile.model';

@Component({
  selector: 'app-bible-bottom-sheet',
  templateUrl: './bible-bottom-sheet.component.html',
  styleUrls: ['./bible-bottom-sheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BibleBottomSheetComponent implements OnInit {
  //color:any;
  //colorPicked: string = "#c2dcf3";
  public toggle: boolean = false;
  public toggleNoteForm: boolean = false;
  private word: string = 'color';
  private x: number = 1;
  private combination: string = this.word + this.x; 
  //public highLightArray: string [] = ["YELLOW", "GRAPEFRUIT","PURPLE","TEAL", "SEAGREEN", "CHARTREUSE","ORANGE","SALMON","INDIGO"];
  profileColors: Colors;
  private profileColorsSubscription$; 
  constructor(public bottomSheetRef: MatBottomSheetRef<BibleBottomSheetComponent>, public bibleIS: BibleinfoService) { }
  
  ngOnInit(): void {
    this.profileColorsSubscription$ = this.bibleIS.currentColor.subscribe(currentColorResponse => this.profileColors = currentColorResponse);
  }


  onClose() {

    this.bottomSheetRef.dismiss();
  }  

  changeToggle(closeColorPicker: boolean){
      this.toggle = closeColorPicker;
      console.log(this.profileColors);
  }

 updateHighLightColors(color: string){
   //console.log(color);
   this.profileColors[this.word + this.x] = color;
  //this.profileColors[4] = color;
  //console.log(this.profileColors[this.word +this.x]);
  //if last color has been update reset cplor
  this.x === 10 ? this.x=1 : this.x++ ;

 }

 updateColor(highLight: string){
   this.bibleIS.setColor(highLight);
   this.bibleIS.sendClickEvent();
 }

 ngOnDestroy() {
  //unsubscribe to subscription
  this.profileColorsSubscription$.unsubscribe();

}

}
