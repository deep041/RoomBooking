import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { HttpAPIInterceptor } from 'src/interceptor/http.interceptor';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatSnackBarModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAPIInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
