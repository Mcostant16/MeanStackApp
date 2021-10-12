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
  encapsulation: ViewEncapsulation.None
})
export class BibleChildComponent implements OnChanges, OnInit  {
  
  clickEventsubscription:Subscription;
  //Component
  @Input() bibleInfoChild;
  btnElement: any;
  lifecycleTicks: number = 0;
  listenFunc: Function;
  bibleInfoCheck;
  bibleStyle: string;
  color: any;
  verseArray: string [] = [];
  uniqueVerseArray: string [] = [];
  verseInfo: { bibleverse: "",
               background: ""}; 
  bottomSheetOpen: boolean = false; 
  dialogConfig: MatBottomSheetConfig;
  removeUnderlineArr: string [] = [];

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
  this.clickEventsubscription=this.bibleIS.getClickEvent().subscribe(()=>{
    this.updateColor();
    })
}

ngOnChanges(changes: SimpleChanges){
  //used detech changes as alternative to setTimout I believe it works better and is more angular...
  this.cd.detectChanges();
  this.addEventListeners();
  console.log(this.lifecycleTicks++);
 
}


addEventListeners(){
  if (this.elementRef.nativeElement.querySelector(".newAwesomeClass")) {
    this.btnElement = this.elementRef.nativeElement.querySelector(".newAwesomeClass");
    this.listenFunc = this.renderer2.listen(this.btnElement , 'click', (event) => {
      // Do something with 'event'
     // alert('hello listener');
     // this.showmessage();
      console.log(this.lifecycleTicks++);
      console.log(event);
      console.log(event.target.dataset.verseId);
      this.bibleStyle = event.target.dataset.verseId;
      const index = this.verseArray.indexOf(this.bibleStyle);
      const el = this.elementRef.nativeElement.querySelectorAll(`[data-verse-id="${this.bibleStyle}"]`);
      console.log(el);
      //console.log(index);
      //only add the style if it is not yet in array and is not undefined
      if (index > -1 || !this.bibleStyle) {
        this.verseArray.splice(index, 1); //remove element from array
        el.forEach(element => {
          this.renderer2.removeClass(element, 'underlineClass');
        });   
       
      } 
      else { 
        el.forEach(element => {
          this.renderer2.addClass(element, 'underlineClass');
          this.removeUnderlineArr.push(element);
        });
       // this.verseInfo.bibleverse = this.bibleStyle;
        this.verseArray.push(this.bibleStyle);
        console.log(this.bottomSheetOpen);
        console.log(this.verseArray);
          //check and see if the bottomsheet menu is open and subscribe to events on observables.
          if(!this.bottomSheetOpen){
      
            const bottomSheetRef = this.bottomSheet.open(BibleBottomSheetComponent, this.dialogConfig);
            
            bottomSheetRef.afterOpened().subscribe( ()=> {
                this.bottomSheetOpen = true;
                this.cd.detectChanges();
            });
            
            bottomSheetRef.afterDismissed().subscribe( ()=> {
                //this.booleanValue = true;
                //this.cd.detectChanges();
                this.verseArray = [];
                this.removeUnderlineArr.forEach(element => {
                  this.renderer2.removeClass(element, 'underlineClass');
                });  
                this.bottomSheetOpen = false;
                this.cd.detectChanges();
                
            });
          }
       
      //bottomSheetRef.dismiss();   
    }
      
      //this.uniqueVerseArray = [... new Set(this.verseArray)];
      //console.log(this.uniqueVerseArray);
     });
    }
    
  }

updateColor(){
  this.removeUnderlineArr.forEach(element => {
    this.renderer2.setStyle(element, 'background-color', this.bibleIS.userColors.color1);
  });
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
