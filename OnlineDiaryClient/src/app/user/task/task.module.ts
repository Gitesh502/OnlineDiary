import { NgModule } from '@angular/core';

import { TaskRoutingModule } from './task-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { TaskComponent } from './task.component';
import { SharedModule } from '../../shared/shared.module';
import { Imports } from 'src/app/imports';

@NgModule({
  imports: [
    TaskRoutingModule,
    SharedModule,
    Imports
  ],
  declarations: [AddComponent, ViewComponent,TaskComponent]
})
export class TaskModule { }
