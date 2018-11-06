import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'Dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'freerun', loadChildren: './freerun/freerun.module#FreerunPageModule' },
  { path: 'ghostrun', loadChildren: './ghostrun/ghostrun.module#GhostrunPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'selectionpage', loadChildren: './selectionpage/selectionpage.module#SelectionpagePageModule' },
  { path: 'mapfreerun', loadChildren: './mapfreerun/mapfreerun.module#MapfreerunPageModule' },
  { path: 'gpxhistory', loadChildren: './gpxhistory/gpxhistory.module#GpxhistoryPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
