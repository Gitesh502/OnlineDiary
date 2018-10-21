import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) {
  }

  add(diary:any){
    return this.http.post(AppConfig.settings.apiServer.metadata+"diary/save",JSON.stringify(diary),this.httpOptions);
  }
}
