import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  login(credentials: {login: string, senha: string}): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Armazena o token no localStorage
          localStorage.setItem('authToken', response.token);
          // Exibe o token no console (opcional)
          console.log('Token recebido:', response.token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}