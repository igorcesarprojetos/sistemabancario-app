import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BancosModel } from '../models/bancos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

    baseUrl: string= 'https://brasilapi.com.br'
  
    constructor(private http:HttpClient) { }
 
    //Get /banks/v1
    getAll():Observable<BancosModel[]>{
      return this.http.get<BancosModel[]>(`${this.baseUrl}/api/banks/v1`);
    }

    //Get /banks/v1/{code}
    getByCode(code:number):Observable<BancosModel>{
      return this.http.get<BancosModel>(`${this.baseUrl}/api/banks/v1/${code}`)
    }

    //Post /banks/v1
    addBanco(banco:BancosModel):Observable<BancosModel>{
      return this.http.post<BancosModel>(`${this.baseUrl}/api/banks/v1`,banco)
    }

    //Put /banks/v1/{code}
    updateBanco(code:number,banco:BancosModel):Observable<BancosModel>{
      return this.http.put<BancosModel>(`${this.baseUrl}/api/banks/v1/${code}`,banco)
    }

    //Patch /banks/v1/{code}
    updatePatchBanco(code:number,banco:BancosModel):Observable<BancosModel>{
      return this.http.patch<BancosModel>(`${this.baseUrl}/api/banks/v1/${code}`,banco)
    }

    //Delete /banks/v1/{code}
    deleteBanco(banco:BancosModel):Observable<any>{
      return this.http.delete(`${this.baseUrl}/api/banks/v1/${banco.code}`)
    }
}
