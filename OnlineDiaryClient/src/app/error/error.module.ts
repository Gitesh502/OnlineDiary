import { NgModule } from '@angular/core';
import { ErrorRoutingModule } from './error-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { Imports } from '../imports';

@NgModule({
  imports: [
    Imports,
    ErrorRoutingModule
  ],
  declarations: [NotfoundComponent]
})
export class ErrorModule { }
