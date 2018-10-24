import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbDialogModule, NbDatepickerModule, NbToastrModule } from '@nebular/theme';
import { HttpModule } from '@angular/http';

import { UserModule } from './user/user.module';
import { ErrorModule } from './error/error.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppConfig } from './app.config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { Ng2SmartTableModule } from 'ng2-smart-table';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NbThemeModule.forRoot({ name: 'default' }), 
    NbLayoutModule,
    BrowserModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    HttpModule,
    HttpClientModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    UserModule,
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    ErrorModule,
    NbToastrModule.forRoot(),

  ],
  providers: [
    AppConfig,
       { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfig], multi: true },
        
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
