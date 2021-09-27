import { Component, SimpleChanges, OnInit, Renderer2, ElementRef, Input,   OnChanges,  ChangeDetectorRef,  
  ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml} from '@angular/platform-browser';
@Component({
  selector: 'app-c',
  templateUrl: './bible-child.component.html',
  styleUrls: ['./bible-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BibleChildComponent implements OnChanges, OnInit  {


  @Input() bibleInfoChild;
  btnElement: any;
  lifecycleTicks: number = 0;
  listenFunc: Function;
  bibleInfoCheck;
  
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
      this.showmessage();
      console.log(this.lifecycleTicks++);
      console.log(event);
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
