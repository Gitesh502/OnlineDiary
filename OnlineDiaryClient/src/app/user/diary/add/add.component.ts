import { Component, OnInit, ViewChild } from '@angular/core';
import { Diary } from '../../models/index';
import { EditorComponent } from 'src/app/shared/editor/editor.component';
import { DiaryService } from '../services/diary.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild(EditorComponent)
  private editor: EditorComponent;
  public editorValue: string = '';
  diary: Diary;
  editorSettings: any = {};
  submitted: boolean = false;
  id: number = 0;
  constructor(
    private diaryService: DiaryService,
    public msg: MessageService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.diary = new Diary();
    this.initvalues();
  }

  ngOnInit() {
    this.msg.reset();
    this.route.params.subscribe(params => {
      this.id = +params['pageno']; // (+) converts string 'id' to a number
      if (this.id > 0 && !Number.isNaN(this.id)) {
        this.getDiary(this.id);
      }
      else {
        this.id = 0;
      }
    });
  }

  initvalues() {
    this.diary.createdOn = new Date();
  }

  getDiary(pageNo) {
    this.msg.setLoading(true);
    this.diaryService.getByPage(pageNo)
      .subscribe((data: any) => {
        if (data.valid) {
          this.diary = data.response;
          this.editor.setEditor(data.response.body);
          this.msg.setLoading(false);
        }
        else {
          this.msg.toastr('E', data.msg, 'Error');
        }
      }, err => {
        this.msg.toastr('E', err.msg, 'Error');
      })
  }

  addDiary() {
    this.submitted = true;
    this.diary.body = this.editor.getEditorBody();
    this.diaryService.add(this.diary)
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

  updateDiary() {
    this.submitted = true;
    this.diary.body = this.editor.getEditorBody();
    this.diaryService.update(this.diary)
      .subscribe((data: any) => {
        this.submitted = false;
        if (data.valid) {
          this.resetForm()
          this.msg.toastr('S', data.msg, 'Success');
          this.router.navigate(['/user/diary/view']);
        }
        else {
          this.msg.toastr('E', data.msg, 'Error');
        }
      }, err => {
        this.msg.toastr('E', err.msg, 'Error');
      })
  }

  resetForm() {
    this.diary = new Diary();
    this.editor.clear();
    this.msg.reset();
    this.initvalues();
  }

  reset() {
    if (this.id > 0 && !Number.isNaN(this.id)) {
      this.router.navigateByUrl("user/diary/view")
    }
    else {
      this.resetForm();
    }
  }
}
