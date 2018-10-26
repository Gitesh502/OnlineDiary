import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
   
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivate:[AuthGuard]
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  },
  { path: '', redirectTo: 'auth',pathMatch:'full' },
  //{ path: '**', redirectTo: 'error',pathMatch:'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation:'enabled'
  })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
