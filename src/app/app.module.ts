import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from "ngx-loading";
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { StoreModule } from '@ngrx/store';
import { LoginReducer, RoleReducer } from 'src/_store/page.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MonitorPageComponent } from './components/monitor-page/monitor-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
// import { ForgotPasswordPageComponent } from './auth/forgot-password-page/forgot-password-page.component';
import { CustomerDetailPageComponent } from './components/customer-page/detail-page/customer-detail-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        HeaderComponent,
        MonitorPageComponent,
        HomePageComponent,
        LoginPageComponent,
        // ForgotPasswordPageComponent,
        CustomerDetailPageComponent,
        CustomerPageComponent,
        SignUpPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.wanderingCubes,
            backdropBackgroundColour: 'rgba(0,0,0,0.5)',
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff',
            fullScreenBackdrop: false,
        }),
        StoreModule.forRoot({ 
            isLogin: LoginReducer,
            isTest: RoleReducer
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
