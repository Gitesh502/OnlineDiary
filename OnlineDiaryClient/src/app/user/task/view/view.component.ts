import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  taskList: any = [];
  constructor(
    private taskService: TaskService
    , public msgService: MessageService
    , private router:Router) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.msgService.setLoading(true);
    this.taskService.get().subscribe((data: any) => {
      if (data.valid) {
        data.response.forEach(element => {
          this.taskList.push({
            id: element.id,
            title: element.title,
            createdOn: element.createdOn,
            description: element.description,
          });
        });
      }
      else {
        this.msgService.show(false, data.msg);
      }
      this.msgService.setLoading(false);
    }, err => {
      this.msgService.setLoading(false);
      this.msgService.show(false, "Error Occured");
    })
  }

  editTask(task:any){
    console.log(task)
    this.router.navigate(["user/task/add",task.id])
  }
}
