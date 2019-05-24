import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) {
  }

  add(task:any){
    return this.http.post(AppConfig.settings.apiServer.metadata+"task/save",JSON.stringify(task),this.httpOptions);
  }
  get():any{
    return this.http.get(AppConfig.settings.apiServer.metadata+"task/getByUserId",this.httpOptions);
  }
  getByTaskId(taskId:string){
    return this.http.get(AppConfig.settings.apiServer.metadata+"task/getByTaskId?taskId="+taskId,this.httpOptions);
  }
  update(task:any){
    return this.http.post(AppConfig.settings.apiServer.metadata+"task/update",JSON.stringify(task),this.httpOptions);
  }
}
