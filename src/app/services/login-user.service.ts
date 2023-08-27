import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/LoginResponse.interface';
import { UserRoleResponse } from '../interfaces/UserRoleResonse.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

private apiUrl = "http://localhost:8080/hms/login"
constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    console.log('Basic ' + btoa(username + ':' + password));
    return this.http.post<LoginResponse>(this.apiUrl,null,{headers});
    
  }
  getUserRoleFromToken():Observable<UserRoleResponse>{
    const headers = new HttpHeaders({
    'xHmAuthToken': sessionStorage.getItem('token') ?? ''
    });
    var res=this.http.get<UserRoleResponse>("http://localhost:8080/hms/user/getRole",{headers})
    console.log(res);
    return res;
  }
}