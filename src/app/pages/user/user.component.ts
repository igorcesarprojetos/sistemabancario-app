import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    standalone: false
})
export class UserComponent implements OnInit , OnDestroy {
  
  public dataSource: UserModel[]=[];
  userAdd:UserModel = new UserModel();

  constructor(private userService:UserService){

  }
  

  ngOnInit(): void {
    this.dataSource =[]
    this.loaderSource()    
  }

  loaderSource() {
    this.userService.getAll().subscribe((response:UserModel[])=>{
      this.dataSource = response;
    });
    this.userService.getAll().subscribe({      
        next:(response:UserModel[])=> {
          this.dataSource = response;
        },
        error:(err)=> {
            alert(err);
            throw err
        },
    });    
  }

  btnDeletar(user: UserModel):void {    
    // let index = this.dataSource.findIndex((item)=> item == user)
    // this.dataSource.splice(index,1)
    // this.dataSource = Array.from(this.dataSource)
    // alert("Deletado")
    this.userService.deleteUser(user).subscribe({      
        next:(response:UserModel)=>{
          alert("Deletado") 
        },
        error:(err)=> {
            alert(err);
            throw err
        },
    });    
  }
  
  btnSearch(user: UserModel):void {
     //alert("Buscando")
     this.userService.getById(user.id).subscribe({      
        next:(response:UserModel)=>{
          let json = JSON.stringify(response)
          alert(json) 
        },
        error:(err)=> {
            alert(err);
            throw err
        },
    });    
  }

  btnEditar(user:UserModel){
    if(user.id>0){
      this.userService.getById(user.id).subscribe({      
        next:(response:UserModel)=>{
           this.userAdd.id = response.id;
           this.userAdd.nome=response.nome;
           this.userAdd.senha=response.senha
           this.userAdd.login=response.login
           this.userAdd.email=response.email
        },
        error:(err)=> {
            alert(err);
            throw err
        },
      });    
    }
  }

  btnSave():void {
    // if(this.userAdd.nome){      
    //   this.dataSource.push(this.userAdd)
    //   this.dataSource = Array.from(this.dataSource)
    //   alert("Salvo");
    // }
     if(this.userAdd.id==0 && this.userAdd.nome){      
      this.userService.addUser(this.userAdd).subscribe({
        next:(response:UserModel)=>{
          alert("Salvo");
        },
        error:(err)=> {
            alert(err.message);
            throw err
        },
      })
    }else if(this.userAdd.id > 0 && this.userAdd.nome){      
      this.userService.updateUser(this.userAdd.id,this.userAdd).subscribe({
        next:(response:UserModel)=>{
          alert(`${this.userAdd.nome} editado com sucesso`);
        },
        error:(err)=> {
            alert(err.message);
            throw err
        },
      })
    }
  }
  ngOnDestroy(): void {
    this.dataSource = [];
    this.userAdd = new UserModel(); 
  }

}
