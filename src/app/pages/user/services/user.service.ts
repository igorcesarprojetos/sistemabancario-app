import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // baseUrl: string= 'https://jsonplaceholder.typicode.com'

  // constructor(private  http:HttpClient) { }

  // //Get /users/1
  // getById(id:number):Observable<UserModel>{
  //   return this.http.get<UserModel>(`${this.baseUrl}/users/${id}`)
  // }

  // //Get /users
  // getAll():Observable<UserModel[]>{
  //   return this.http.get<UserModel[]>(`${this.baseUrl}/users`)
  // }
  
  // //Post /users
  // addUser(user:UserModel):Observable<UserModel>{
  //   return this.http.post<UserModel>(`${this.baseUrl}/users`,user)
  // }

  // //Put /users/1
  // updateUser(id:number,user:UserModel):Observable<UserModel>{
  //   return this.http.put<UserModel>(`${this.baseUrl}/users/${id}`,user)
  // }

  // //Patch /users/1
  // updatePatchUser(id:number,user:UserModel):Observable<UserModel>{
  //   return this.http.patch<UserModel>(`${this.baseUrl}/users/${id}`,user)
  // }

  // //Delete /users/1
  // deleteUser(user:UserModel):Observable<any>{
  //   return this.http.delete(`${this.baseUrl}/users/${user.id}`)
  // }
  baseUrl: string= 'http://localhost:3000'

  
  constructor(private  http:HttpClient) {
  }

  private getHttpOptions() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage["authToken"]
    })
  };
}

  //Get /users/1
  getById(id:number):Observable<UserModel>{
    return this.http.get<UserModel>(`${this.baseUrl}/usuario/${id}`,this.getHttpOptions())
  }

  //Get /users
  getAll():Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.baseUrl}/usuarios`,this.getHttpOptions())
  }
  
  //Post /users
  addUser(user:UserModel):Observable<UserModel>{
    return this.http.post<UserModel>(`${this.baseUrl}/cadastrarusuario`,user,this.getHttpOptions())
  }

  //Put /users/1
  updateUser(id:number,user:UserModel):Observable<UserModel>{
    return this.http.put<UserModel>(`${this.baseUrl}/usuario/${id}`,user,this.getHttpOptions())
  }

  //Patch /users/1
  updatePatchUser(id:number,user:UserModel):Observable<UserModel>{
    return this.http.patch<UserModel>(`${this.baseUrl}/usuario/${id}`,user,this.getHttpOptions())
  }

  //Delete /users/1
  deleteUser(user:UserModel):Observable<any>{
    return this.http.delete(`${this.baseUrl}/usuario/${user.id}`,this.getHttpOptions())
  }

}
