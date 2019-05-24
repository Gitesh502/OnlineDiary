import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { Imports } from '../imports';
import { DiaryModule } from 'src/app/user/diary/diary.module';
import { TaskModule } from 'src/app/user/task/task.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  imports: [
    UserRoutingModule,
    DiaryModule,
    TaskModule,
    Imports,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot()
  ],
  declarations: [DashboardComponent,UserComponent],
  exports:[UserComponent]
  
})
export class UserModule { }
