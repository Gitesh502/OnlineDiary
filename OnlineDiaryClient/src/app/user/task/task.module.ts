import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { TaskComponent } from './task.component';
import { Imports } from 'src/app/imports';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    Imports
  ],
  declarations: [AddComponent, ViewComponent,TaskComponent]
})
export class TaskModule { }
