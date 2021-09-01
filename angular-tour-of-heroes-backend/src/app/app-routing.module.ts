import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
import { BibleComponent } from './user-profile/bible/bible.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:_id', component: HeroDetailComponent },
  { path: 'signup', component: UserComponent, 
   children: [{ path: '', component: SignUpComponent }] },
  { path: 'login', component: UserComponent, 
   children: [{ path: '', component: SignInComponent }] },
  { path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]},
  { path: 'admin', component: AdminComponent },  
  { path: 'userform', component: UserFormComponent }  ,
  { path: 'bible', component: BibleComponent }  
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
