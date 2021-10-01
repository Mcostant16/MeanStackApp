import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
//import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
//import { User } from '../../shared/user.model';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bible-bottom-sheet',
  templateUrl: './bible-bottom-sheet.component.html',
  styleUrls: ['./bible-bottom-sheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BibleBottomSheetComponent implements OnInit {
  color:any;
  constructor(public bottomSheetRef: MatBottomSheetRef<BibleBottomSheetComponent>) { }

  ngOnInit(): void {
  }


  onClose() {

    this.bottomSheetRef.dismiss();
  }  

}
