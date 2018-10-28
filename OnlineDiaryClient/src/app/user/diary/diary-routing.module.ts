import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './diary.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path:'',
    component:DiaryComponent,
    children:[
      {
        path:'add',
        component:AddComponent
      },
      {
        path:'view',
        component:ViewComponent
      },
      {
        path:'add/:pageno',
        component:AddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
