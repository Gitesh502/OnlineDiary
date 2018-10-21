import { Injectable } from '@angular/core';
import { message } from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: message;
  constructor() { 
    this.messages = new message();
  }

  show(valid:boolean,msg:string){
    this.reset();
    this.messages.messages.push(msg);
    this.messages.display = true;
    this.messages.valid = valid;
   
  }
  get(): message {
    return this.messages;
  }
  reset() {
    this.messages.messages = [];
    this.messages.display = false;
    this.messages.valid = false;
  }
}
