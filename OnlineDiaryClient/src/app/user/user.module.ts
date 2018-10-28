import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { Imports } from '../imports';
import { DiaryModule } from 'src/app/user/diary/diary.module';
import { TaskModule } from 'src/app/user/task/task.module';

@NgModule({
  imports: [
    UserRoutingModule,
    DiaryModule,
    TaskModule,
    Imports,
    
   // BrowserAnimationsModule,
  ],
  declarations: [DashboardComponent,UserComponent],
  exports:[UserComponent]
  
})
export class UserModule { }
