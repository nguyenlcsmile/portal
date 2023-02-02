import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MonitorPageComponent } from './components/monitor-page/monitor-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { CustomerDetailPageComponent } from './components/customer-page/detail-page/customer-detail-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        HeaderComponent,
        MonitorPageComponent,
        HomePageComponent,
        LoginPageComponent,
        ForgotPasswordPageComponent,
        CustomerDetailPageComponent,
        CustomerPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, 
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
