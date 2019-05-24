import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path:'',
    component:TaskComponent,
    children:[
      {
        path:'add',
        component:AddComponent
      },
      {
        path:'add/:id',
        component:AddComponent
      },
      {
        path:'view',
        component:ViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
