import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnChanges {

   
  @Input() Drawer:any;
  @Input() IsAuth!:boolean;
  usuarioLogado:string=""

  subscription !: Subscription

  constructor(private shared:SharedService , private router: Router){
   
  }  
  ngOnChanges(changes: SimpleChanges): void {
    this.mostrarUserLogado();
  }
  

  mostrarUserLogado(){
       this.subscription = this.shared.getUserName().subscribe((retorno:string)=>{
      this.usuarioLogado = retorno;
    });
  }

  showMenu() {
    this.Drawer.toggle();
  }

  logout() {
    this.shared.setUserName("");
    this.subscription.unsubscribe()
    let logged:boolean = this.shared.isAuthenticated()
    if(!logged){
      this.router.navigate(['login'])
    }
  } 

}
