import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit , OnDestroy {
  
  dataSource: UserModel[]=[];
  userAdd:UserModel = new UserModel();

  constructor(private userService:UserService){

  }
  

  ngOnInit(): void {
    this.dataSource =[ ]
    this.loaderSource()    
  }

  loaderSource() {
    this.userService.getAll().subscribe((response:UserModel[])=>{
      this.dataSource = response;
    });
  }

  btnDeletar(user: UserModel):void {    
    let index = this.dataSource.findIndex((item)=> item == user)
    this.dataSource.splice(index,1)
    this.dataSource = Array.from(this.dataSource)
    alert("Deletado")
  }
  
  btnSearch(user: UserModel):void {
     //alert("Buscando")
     this.userService.getById(user.id).subscribe((response:UserModel)=>{
      let json = JSON.stringify(response)
      alert(json)      
    });    
  }

  btnSave():void {
    if(this.userAdd.name){      
      this.dataSource.push(this.userAdd)
      this.dataSource = Array.from(this.dataSource)
      alert("Salvo");
    }
  }
  ngOnDestroy(): void {
    this.dataSource = [];
    this.userAdd = new UserModel(); 
  }

}
