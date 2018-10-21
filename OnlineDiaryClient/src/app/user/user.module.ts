import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { Imports } from '../imports';
import { DiaryModule } from 'src/app/user/diary/diary.module';

@NgModule({
  imports: [
    UserRoutingModule,
    DiaryModule,
    Imports,
    
   // BrowserAnimationsModule,
  ],
  declarations: [DashboardComponent,UserComponent],
  exports:[UserComponent]
  
})
export class UserModule { }
