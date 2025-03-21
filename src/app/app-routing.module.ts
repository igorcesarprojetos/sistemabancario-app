import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './pages/info/info.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BancosComponent } from './pages/bancos/bancos.component';
import { AuthGuard } from './shared/auth-guard.service';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path:"" , redirectTo:"home",pathMatch:'full' },
  { path:"home" , component:HomeComponent, canActivate:[AuthGuard] },
  { path:"info" , component:InfoComponent, canActivate:[AuthGuard] },
  { path:"bancos" , component:BancosComponent, canActivate:[AuthGuard] },
  { path:"user" , component:UserComponent, canActivate:[AuthGuard] },
  { path:"login" , component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
