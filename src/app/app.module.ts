import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { MonitorPageComponent } from './components/monitor-page/monitor-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        HeaderComponent,
        CustomerPageComponent,
        MonitorPageComponent,
        HomePageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
