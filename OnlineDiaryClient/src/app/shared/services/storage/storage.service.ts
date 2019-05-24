import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  set(key:string,data:any){
    localStorage.setItem(key,JSON.stringify(data));
  }
  get(key:string):any{
      return JSON.parse(localStorage.getItem(key));
  }
  remove(key:string){
      localStorage.removeItem(key);
  }
  setToken(token:string,refreshToken:string){
    let user = this.get('user');
    user.token=token;
    user.user.token=token;
    user.user.refreshToken = refreshToken;
    this.set('user',user);
  }
  removeAll(){
    localStorage.clear();
  }
}
