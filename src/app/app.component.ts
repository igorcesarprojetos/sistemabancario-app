import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sistemabancario-app';
  isAuth:boolean = false

  constructor(private shared:SharedService){

  }

  ngOnInit(): void {
    this.shared.getUserName().subscribe((retorno:string)=>{
      if(retorno){
        this.isAuth = true
      }else{
        this.isAuth = false
      } 
    });
  }
  
}
