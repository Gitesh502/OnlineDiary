import { Component, OnInit, ViewChild } from '@angular/core';
import { Diary } from '../../models/index';
import { EditorComponent } from 'src/app/shared/editor/editor.component';
import { DiaryService } from '../services/diary.service';
import { MessageService } from 'src/app/shared/services/message/message.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild(EditorComponent)
  private editor:EditorComponent;
  public editorValue: string = '';
  diary:Diary;
  editorSettings: any = {};
  submitted:boolean=false;
  constructor(
    private diaryService:DiaryService,
    private msg: MessageService
    ) { 
    this.diary=new Diary();
  }

  ngOnInit() {
  }

  addDiary(){
    this.submitted=true;
    console.log(this.editor);
    this.diary.body = this.editor.getEditorBody();
    this.diaryService.add(this.diary)
    .subscribe((data:any)=>{
      this.submitted=false;
      if(data.valid){
        this.resetForm()
        this.msg.toastr('S',data.msg,'Success');
      }
      else{
        this.msg.toastr('E',data.msg,'Error');
      }
    },err=>{
      this.msg.toastr('E',err.msg,'Error');
    })
  }

  resetForm(){
    this.diary=new Diary();
    this.editor.clear();
    
  }

}
