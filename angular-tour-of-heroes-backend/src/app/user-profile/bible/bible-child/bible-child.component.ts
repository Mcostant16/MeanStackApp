import { Component, SimpleChanges, OnInit, Renderer2, ElementRef, Input, OnChanges,  ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml} from '@angular/platform-browser';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef} from '@angular/material/bottom-sheet';
//import { DialogService } from '../shared/dialog.service';
import { BibleBottomSheetComponent } from './bible-bottom-sheet/bible-bottom-sheet.component';
import {Overlay} from '@angular/cdk/overlay'; // need this to have scroll bar work when scrolling with bottomsheetopen
import { Subscription } from 'rxjs';
import { BibleinfoService } from '../../../shared/bibleinfo.service';

@Component({
  selector: 'app-c',
  templateUrl: './bible-child.component.html',
  styleUrls: ['./bible-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BibleChildComponent implements OnChanges, OnInit  {
  
  clickEventsubscription:Subscription;
  //Component
  @Input() bibleInfoChild;
  btnElement: any;
 // lifecycleTicks: number = 0;
  listenFunc: Function;
 // bibleInfoCheck;
  //bibleStyle: string;
  color: any;
  //verseArray: string [] = [];
  //uniqueVerseArray: string [] = [];
  //verseInfo: { bibleverse: "",
  //             background: ""}; 
  bottomSheetOpen: boolean = false; 
  dialogConfig: MatBottomSheetConfig;
  removeUnderlineArr: string [] = [];
  //private bottomSheetRef: MatBottomSheetRef;
  //i had to put bottomSheetRef in service which makes sense now any component can reference it through service.

  constructor(private elementRef: ElementRef, private renderer2: Renderer2,
     private sanitizer: DomSanitizer,private cd: ChangeDetectorRef,
     public bottomSheet: MatBottomSheet, overlay: Overlay, private bibleIS: BibleinfoService) {
      this.dialogConfig = new MatBottomSheetConfig();
      this.dialogConfig.disableClose = true;
      this.dialogConfig.autoFocus = false;
      this.dialogConfig.hasBackdrop = false;
      this.dialogConfig.panelClass = 'customWidth' ;
      this.dialogConfig.scrollStrategy = overlay.scrollStrategies.noop(); //need this setting in order to have scroll bar work while bottom sheet is open.
      }
  

ngOnInit(): void {
 // subscribe to getClickEvent() in service when triggered run this.updateColor Function
  this.clickEventsubscription=this.bibleIS.getClickEvent().subscribe(()=>{
    this.updateColor();
    });
}

ngOnChanges(changes: SimpleChanges){
  //used detech changes as alternative to setTimout I believe it works better and is more angular...
  this.cd.detectChanges();
  this.addEventListeners();
 // console.log(this.lifecycleTicks++);
}


addEventListeners(){
  if (this.elementRef.nativeElement.querySelector(".newAwesomeClass")) {
    this.btnElement = this.elementRef.nativeElement.querySelector(".newAwesomeClass");
    this.listenFunc = this.renderer2.listen(this.btnElement , 'click', (event) => {
      // Do something with 'event'
      let bibleStyle = event.target.dataset.verseId;
      const index = this.bibleIS.verseArray.indexOf(bibleStyle);
      const el = this.elementRef.nativeElement.querySelectorAll(`[data-verse-id="${bibleStyle}"]`);
      //console.log(el);
      //console.log(index);git a
      //only add the style if it is not yet in array and is not undefined
      if (index > -1 || !bibleStyle) {
        el.forEach(element => {
          this.renderer2.removeClass(element, 'underlineClass');
          //had to add the following code to remove double clicked underline from removeUnderlineArr
          //if someone double clicks color does not get added
          const index2 = this.removeUnderlineArr.indexOf(element); 
          //if element is in removeunderlinearr rremove it from arrays and run function to update notes in service.
          if (index2 > -1) {
            this.removeUnderlineArr.splice(index2,1);
            this.bibleIS.verseArray.splice(index, 1);
            this.bibleIS.updateVerseArray();
          }
        });   
       
      } 
      else { 
        el.forEach(element => {
          this.renderer2.addClass(element, 'underlineClass');
          this.removeUnderlineArr.push(element);
         
        });
         this.bibleIS.verseArray.push(bibleStyle);
         this.bibleIS.updateVerseArray();
          //console.log(this.bibleIS.verseArray);
          //check and see if the bottomsheet menu is open and subscribe to events on observables.
          if(!this.bottomSheetOpen){
            this.bibleIS.bottomSheetRef = this.bottomSheet.open(BibleBottomSheetComponent, this.dialogConfig);
            this.bibleIS.bottomSheetRef.afterOpened().subscribe( ()=> {
                this.bottomSheetOpen = true;
                this.cd.detectChanges();
            });
            
          this.bibleIS.bottomSheetRef.afterDismissed().subscribe( ()=> {
                //this.cd.detectChanges();
            this.bibleIS.verseArray = [];
            this.removeUnderlineArr.forEach(element => {
                this.renderer2.removeClass(element, 'underlineClass');
            });  
              this.removeUnderlineArr = [];
              this.bottomSheetOpen = false;
              this.cd.detectChanges();
                
          });
        } 
     }
    //this.uniqueVerseArray = [... new Set(this.verseArray)];
    });
  }
}

updateColor(){
  //this function is triggered by the service that is subscribed to ngOnit 
  //when the clickevent is triggered it runs this function to highlight verses and close sheet
  this.removeUnderlineArr.forEach(element => {
    this.renderer2.setStyle(element, 'background-color', this.bibleIS.updateColor);
  });
  this.bibleIS.bottomSheetRef.dismiss();

}

showmessage() {
  alert('hello world');
}

ngOnDestroy() {
  // Remove the listeners!
  this.listenFunc();
  this.clickEventsubscription.unsubscribe();

}


}
