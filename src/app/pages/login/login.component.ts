import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from '../user/services/user.service';
import { UserModel } from '../user/models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string=""
  password: string=""
  mensagemLogin: string=""

  dataSource: UserModel[]=[];

  constructor(private route:Router, private shared:SharedService, private userService: UserService){

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


  btnLogin() {
    if (this.username=="admin"){
      this.mensagemLogin="Correto"
      this.shared.setUserName(this.username)
      this.route.navigate(["home"])      
    }
    else if (this.username!='' && this.username !="admin" && this.dataSource!.length>0){
      let index =this.dataSource.findIndex((item)=>item.username.toLowerCase() == this.username.toLowerCase())
      if(index > -1){
        this.mensagemLogin="Correto"
        this.shared.setUserName(this.username)
        this.route.navigate(["home"])      
      }
      else {
        this.mensagemLogin="Incorreto"
      }     
    }
    else {
      this.mensagemLogin="Incorreto"
    }    
  }
}

