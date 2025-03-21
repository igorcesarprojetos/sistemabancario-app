import { Component, OnDestroy, OnInit } from '@angular/core';
import { BancosModel } from './models/bancos.model';
import { BancosService } from './services/bancos.service';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent  implements OnInit , OnDestroy{

  dataSource: BancosModel[]=[];
  bancoAdd:BancosModel= new BancosModel();
  
  constructor(private bancoService:BancosService){
  }
    
  ngOnInit(): void {
    this.dataSource =[ ]
    this.loaderSource()    
  }
  
  loaderSource() {
    this.bancoService.getAll().subscribe((response:BancosModel[])=>{
      this.dataSource = response;
    });
  }
  
  btnDeletar(banco: BancosModel):void {    
    let index = this.dataSource.findIndex((item)=> item == banco)
    this.dataSource.splice(index,1)
    this.dataSource = Array.from(this.dataSource)
    alert("Deletado")
  }
    
  btnSearch(banco: BancosModel):void {
    // alert("Buscando")
    this.bancoService.getByCode(banco.code).subscribe((response:BancosModel)=>{
     let json = JSON.stringify(response)
     alert(json)      
    });    
  }
  
  btnSave():void {
    if(this.bancoAdd.name){     
      this.dataSource.push(this.bancoAdd)
      this.dataSource = Array.from(this.dataSource)
      alert("Salvo");
    }
  }

  ngOnDestroy(): void {
    this.dataSource =[];
    this.bancoAdd=new BancosModel();
  }
  
}
