import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/index';
import { MessageService } from '../../../shared/services/message/message.service';
import { EditorComponent } from 'src/app/shared/editor/editor.component';
import { TaskService } from '../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  task: Task;
  id: string = '';
  tags: any = [];
  submitted: boolean = false;
  @ViewChild(EditorComponent)
  private editor: EditorComponent;
  constructor(
    public msg: MessageService,
    public taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.task = new Task();
    this.initValues();
  }

  ngOnInit() {
    this.msg.reset();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != null && this.id != "") {
        this.getTask(this.id);
      }
      else {
        this.id = '';
      }
    });
  }

  initValues() {
    this.task.createdOn = new Date();
    this.task.startDate = new Date();
    this.task.endDate = new Date();
  }

  addTag(name) {
    return { name: name, tag: true };
  }

  reset() {
    if (this.id != "" && this.id != null) {
      this.router.navigateByUrl("user/task/view");
    }
    else {
      this.resetForm();
    }
  }

  addTask() {
    this.submitted = true;
    this.task.description = this.editor.getEditorBody();
    this.task.tags = this.task.tags.map((x: any) => x.name)
    this.taskService.add(this.task)
      .subscribe((data: any) => {
        this.submitted = false;
        if (data.valid) {
          this.resetForm()
          this.msg.toastr('S', data.msg, 'Success');
        }
        else {
          if (data.type == "alert") {
            this.msg.show(false, "You can edit existing and update!");
          }
          this.msg.toastr('E', data.msg, 'Error');
        }
      }, err => {
        this.msg.toastr('E', err.msg, 'Error');
      })
  }

  resetForm() {
    this.task = new Task();
    this.editor.clear();
    this.msg.reset();
    this.initValues();
  }

  updateTask() {
    this.submitted = true;
    this.task.description = this.editor.getEditorBody();
    this.taskService.update(this.task)
      .subscribe((data: any) => {
        this.submitted = false;
        if (data.valid) {
          this.resetForm()
          this.msg.toastr('S', data.msg, 'Success');
          this.router.navigate(['/user/task/view']);
        }
        else {
          this.msg.toastr('E', data.msg, 'Error');
        }
      }, err => {
        this.msg.toastr('E', err.msg, 'Error');
      })
  }

  getTask(taskId) {
    this.msg.setLoading(true);
    this.taskService.getByTaskId(taskId)
      .subscribe((data: any) => {
        if (data.valid) {
          this.task = data.response;
          this.editor.setEditor(data.response.description);
          this.msg.setLoading(false);
        }
        else {
          this.msg.toastr('E', data.msg, 'Error');
        }
      }, err => {
        this.msg.toastr('E', err.msg, 'Error');
      })
  }
}
