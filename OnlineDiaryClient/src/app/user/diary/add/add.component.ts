import { Component, OnInit, ViewChild } from '@angular/core';
import { Diary } from '../../models/index';
import { EditorComponent } from 'src/app/shared/editor/editor.component';
import { DiaryService } from '../services/diary.service';


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
  constructor(private diaryService:DiaryService) { 
    this.diary=new Diary();
  }

  ngOnInit() {
  }

  addDiary(){
    this.submitted=true;
    console.log(this.editor);
    this.diary.body = this.editor.editorBody;
    this.diaryService.add(this.diary)
    .subscribe(data=>{
      this.submitted=false;
      console.log(data);
    })
  }


}
