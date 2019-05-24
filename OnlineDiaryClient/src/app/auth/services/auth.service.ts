import { Injectable } from '@angular/core';
import { users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient,private storage:StorageService) {
  }

  register(user: users): Observable<ResponseModel> {
    return this.http.post(AppConfig.settings.apiServer.metadata+"account/register", 
    JSON.stringify(user), this.httpOptions)
    .pipe(map((response: ResponseModel) => response));
  }

  login(user:users):any{
    return this.http.post(AppConfig.settings.apiServer.metadata+"account/login",
    JSON.stringify(user),this.httpOptions)
    .pipe(map((response: ResponseModel) => response));
  }

  refreshToken():any{
    let storage = this.storage.get('user');
    let req={
      token:storage.token,
      refreshToken:storage.user.refreshToken
    }
    return this.http.post(AppConfig.settings.apiServer.metadata+"account/refresh",
    JSON.stringify(req),this.httpOptions)
    .pipe(map((response: ResponseModel) => response));
  }

  logout(){
    this.storage.removeAll();
  }
}
