import { NgModule } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { Imports } from '../imports';
import { EditorComponent } from './editor/editor.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  imports: [
    Imports ,

  ],
  exports:[MessageComponent,EditorComponent,DialogBoxComponent],
  declarations: [MessageComponent, EditorComponent, DialogBoxComponent],
})
export class SharedModule { }
