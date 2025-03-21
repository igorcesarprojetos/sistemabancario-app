import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private sharedService:SharedService, private router:Router) { }

  canActivate():Observable<boolean>| boolean{
    let logged:boolean = this.sharedService.isAuthenticated()
    if(!logged){
      this.router.navigate(['login'])
    }
    return logged
  }
}
