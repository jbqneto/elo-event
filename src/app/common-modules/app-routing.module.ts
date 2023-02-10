import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SplashComponent } from '../components/splash/splash.component';
import { MapComponent } from '../components/main/map/map.component';
import { MainComponent } from '../components/main/main.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/main/home/home.component';
import { MembersComponent } from '../components/admin/members/members.component';
import { ScanComponent } from '../components/admin/scan/scan.component';
import { BadgeComponent } from '../components/main/badge/badge.component';

const routes: Route[] = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'logout', component: HomeComponent, pathMatch: 'full' },
      { path: 'badge', component: BadgeComponent, pathMatch: 'full' },
      { path: 'map', component: MapComponent, pathMatch: 'full' },
      { path: 'admin/members', component: MembersComponent, pathMatch: 'full' },
      { path: 'admin/scan', component: ScanComponent, pathMatch: 'full' }
    ] 
  },
]; 

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
