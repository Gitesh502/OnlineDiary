import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivate:[AuthGuard]
  },
  // {
  //   path: 'diary',
  //   loadChildren: './user/diary/diary.module#DiaryModule',
  //   canActivate:[AuthGuard]
  // },
  { path: '', redirectTo: 'auth',pathMatch:'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
