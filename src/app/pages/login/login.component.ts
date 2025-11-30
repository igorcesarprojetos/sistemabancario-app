import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from '../user/services/user.service';
import { UserModel } from '../user/models/user.model'
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {

  username: string=""
  password: string=""
  mensagemLogin: string=""
  token: string | null = null;

  dataSource: UserModel[]=[];

  constructor(private route:Router, private shared:SharedService, private userService: UserService, private authService: AuthService){

  }

  ngOnInit(): void {
      this.dataSource =[]
      this.loaderSource()    
    }
  
    loaderSource() {
      this.userService.getAll().subscribe((response:UserModel[])=>{
        this.dataSource = response;
      });
    }


  // btnLogin() {
  //   if (this.username=="admin"){
  //     this.mensagemLogin="Correto"
  //     this.shared.setUserName(this.username)
  //     this.route.navigate(["home"])      
  //   }
  //   else if (this.username!='' && this.username !="admin" && this.dataSource!.length>0){
  //     let index =this.dataSource.findIndex((item)=>item.username.toLowerCase() == this.username.toLowerCase())
  //     if(index > -1){
  //       this.mensagemLogin="Correto"
  //       this.shared.setUserName(this.username)
  //       this.route.navigate(["home"])      
  //     }
  //     else {
  //       this.mensagemLogin="Incorreto"
  //     }     
  //   }
  //   else {
  //     this.mensagemLogin="Incorreto"
  //   }    
  // }
  btnLogin() {
    
     this.authService.login({login: this.username, senha: this.password}).pipe()
      .subscribe({
        next: (response:any) => {
          // Atualiza o token para exibir no template
          this.token = response.token || this.authService.getToken();
          this.mensagemLogin="Correto"
          this.shared.setUserName(this.username)
          this.route.navigate(["home"])      
        },
        error: (err) => {
          console.error('Erro no login:', err);
        }
      });
  }
}

