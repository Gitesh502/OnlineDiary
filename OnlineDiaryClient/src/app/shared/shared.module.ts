import { NgModule } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { Imports } from '../imports';
import { EditorComponent } from './editor/editor.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { BookComponent } from './book/book.component';

@NgModule({
  imports: [
    Imports ,

  ],
  exports:[MessageComponent,EditorComponent,DialogBoxComponent,BookComponent],
  declarations: [MessageComponent, EditorComponent, DialogBoxComponent, BookComponent],
})
export class SharedModule { }
