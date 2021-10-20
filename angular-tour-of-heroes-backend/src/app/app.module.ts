//built in imports
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
// components
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from "./material/material.module";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatBottomSheetModule, MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { ConfirmWindowComponent } from './confirm-window/confirm-window.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BibleComponent } from './user-profile/bible/bible.component';
import { BibleChildComponent } from './user-profile/bible/bible-child/bible-child.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BibleBottomSheetComponent } from './user-profile/bible/bible-child/bible-bottom-sheet/bible-bottom-sheet.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ColorPickerComponentComponent } from './user-profile/bible/bible-child/bible-bottom-sheet/color-picker-component/color-picker-component.component';
import { BibleNotesSidenavComponent } from './user-profile/bible/bible-notes-sidenav/bible-notes-sidenav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    AdminComponent,
    UserFormComponent,
    ConfirmWindowComponent,
    BibleComponent,
    BibleChildComponent,
    BibleBottomSheetComponent,
    ColorPickerComponentComponent,
    BibleNotesSidenavComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
	  FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
	  MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    ColorPickerModule,
    MatBottomSheetModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
 ],
	// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
   // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
 /* HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
  ) ], */
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard, UserService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [UserFormComponent,ConfirmWindowComponent,BibleBottomSheetComponent]
 
})
export class AppModule { }
