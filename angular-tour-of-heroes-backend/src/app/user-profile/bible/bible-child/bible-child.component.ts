import { Component, SimpleChanges, OnInit, Renderer2, ElementRef, Input,   OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml} from '@angular/platform-browser';
@Component({
  selector: 'app-c',
  templateUrl: './bible-child.component.html',
  styleUrls: ['./bible-child.component.scss']
})
export class BibleChildComponent implements OnChanges, OnInit  {


  @Input() bibleInfoChild;
  btnElement: any;
  lifecycleTicks: number = 0;
  listenFunc: Function;
  
  constructor(private elementRef: ElementRef, private renderer2: Renderer2,
     private sanitizer: DomSanitizer,) { }
  

ngOnInit(): void {

}

ngOnChanges(changes: SimpleChanges){
  //I believe the settimout is needed here to trigger change detection.... I am not really sure this was the only way to get it to work...
  setTimeout( ()=> {
  if (this.elementRef.nativeElement.querySelector(".newAwesomeClass")) {
  this.btnElement = this.elementRef.nativeElement.querySelector(".newAwesomeClass");
  this.listenFunc = this.renderer2.listen(this.btnElement , 'click', (event) => {
    // Do something with 'event'
    alert('hello listener');
    this.showmessage();
    console.log(this.lifecycleTicks++);
    console.log(event);
   });
  }
}); 
 // console.log(this.lifecycleTicks++);
  if(changes.bibleInfoChild.currentValue) {
  
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
