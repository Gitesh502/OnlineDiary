import { NgModule, ErrorHandler } from '@angular/core';

import { TaskRoutingModule } from './task-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { TaskComponent } from './task.component';
import { SharedModule } from '../../shared/shared.module';
import { Imports } from 'src/app/imports';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { GlobalErrorHandlerService } from 'src/app/helpers/global.errorhandler';
import { TaskService } from './services/task.service';

@NgModule({
  imports: [
    TaskRoutingModule,
    SharedModule,
    Imports
  ],
  declarations: [AddComponent, ViewComponent,TaskComponent],
  providers:[
    TaskService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ]
})
export class TaskModule { }
