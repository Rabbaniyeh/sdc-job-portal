import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { BuildResumeModule } from './features/build-resume/build-resume.module';
import { ViewResumeModule } from './features/view-resume/view-resume.module';
import { AuthModule } from './auth.module';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    BuildResumeModule,
    ViewResumeModule,
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
