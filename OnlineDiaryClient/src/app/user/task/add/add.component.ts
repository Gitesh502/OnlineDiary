import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/index';
import { MessageService } from '../../../shared/services/message/message.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  task: Task;
  id: number = 0;
  tags: any = [];
  constructor(
    public msg: MessageService,

  ) {
    this.initValues();
  }

  ngOnInit() {
  }

  initValues() {
    this.task = new Task();
  }

  addTag(name) {
    return { name: name, tag: true };
  } 

  reset(){

  }
}
