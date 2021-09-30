import { Component, SimpleChanges, OnInit, Renderer2, ElementRef, Input, OnChanges,  ChangeDetectorRef,  
  ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml} from '@angular/platform-browser';
@Component({
  selector: 'app-c',
  templateUrl: './bible-child.component.html',
  styleUrls: ['./bible-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BibleChildComponent implements OnChanges, OnInit  {

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

  
  constructor(private elementRef: ElementRef, private renderer2: Renderer2,
     private sanitizer: DomSanitizer,private cd: ChangeDetectorRef) { }
  

ngOnInit(): void {

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
      this.bibleStyle = event.target.dataset.verseId
      const index = this.verseArray.indexOf(this.bibleStyle);
      const el = this.elementRef.nativeElement.querySelectorAll(`[data-verse-id="${this.bibleStyle}"]`);
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
        });
       // this.verseInfo.bibleverse = this.bibleStyle;
        this.verseArray.push(this.bibleStyle);
        console.log(this.verseArray);
       }
      
      //this.uniqueVerseArray = [... new Set(this.verseArray)];
      //console.log(this.uniqueVerseArray);
     });
    }
    
  }


showmessage() {
  alert('hello world');
}

ngOnDestroy() {
  // Remove the listeners!
  this.listenFunc();

}


}
