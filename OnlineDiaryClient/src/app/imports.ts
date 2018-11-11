import { NgModule } from "@angular/core";
import { 
    NbInputModule
    , NbCardModule
    , NbLayoutModule
    , NbCheckboxModule,
    NbButtonModule,
    NbAlertModule,
    NbSidebarModule,
    NbActionsModule,
    NbMenuModule,
    NbUserModule,
    NbContextMenuModule,
    NbDialogModule,
    NbDatepickerModule,
    NbToastrModule,
    NbSpinnerModule

} from "@nebular/theme";
import { NgSelectModule } from '@ng-select/ng-select';

import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    exports: [
        NgSelectModule,
        RouterModule,
        NbInputModule,
        NbCardModule,
        NbLayoutModule,
        NbCheckboxModule,
        NbButtonModule,
        NbAlertModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        NbSidebarModule,
        NbActionsModule,
        NbMenuModule,
        NbUserModule,
        NbContextMenuModule,
        NbDialogModule,
        NbDatepickerModule,
        FormsModule ,
        NbToastrModule,
        NbSpinnerModule
    ],
  })
export class Imports{

}