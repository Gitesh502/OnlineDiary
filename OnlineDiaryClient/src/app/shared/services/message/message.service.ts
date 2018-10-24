import { Injectable } from '@angular/core';
import { message } from '../../models/message';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: message;
  constructor(private toastrService: NbToastrService) {
    this.messages = new message();
  }

  show(valid: boolean, msg: string) {
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
  toastr(status, message, title, config?) {
    switch (status) {
      case 'S':
        this.toastrService.success(message, title);
        break;
      case 'E':
        this.toastrService.danger(message, title);
        break;
      case 'W':
        this.toastrService.warning(message, title);
        break;
      case 'I':
        this.toastrService.info(message, title);
        break;
      case 'P':
        this.toastrService.primary(message, title);
        break;
      default:
        this.toastrService.default(message, title);
        break;
    }
  }
}
