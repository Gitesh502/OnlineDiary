import { NgModule } from '@angular/core';

import { DiaryRoutingModule } from './diary-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DiaryComponent  } from './diary.component';
import { Imports} from 'src/app/imports';

import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiaryService } from './services/diary.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';


@NgModule({
  imports: [
    Imports,
    DiaryRoutingModule,
    EditorModule,
    SharedModule
  ],
  declarations: [ViewComponent, AddComponent,DiaryComponent],
  providers:[
    DiaryService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class DiaryModule { }
