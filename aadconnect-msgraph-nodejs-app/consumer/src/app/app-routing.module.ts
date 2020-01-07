import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RedirectGuardSignIn } from './redirectGuard/redirectGuardSignIn';
import { RedirectGuardSignOut } from './redirectGuard/redirectGuardSignOut';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'users', component: UsersComponent },
  {
    path: 'signin',
    canActivate: [RedirectGuardSignIn],
    component: RedirectGuardSignIn,
    data: {
       externalUrl: 'http://localhost:3000/auth/signin'
     }
  },
  {
    path: 'signout',
    canActivate: [RedirectGuardSignOut],
    component: RedirectGuardSignOut,
    data: {
       externalUrl: 'http://localhost:3000/auth/signout'
     }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
