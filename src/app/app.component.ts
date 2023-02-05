import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Amplify } from "@aws-amplify/core";
import configAppSync from '../aws-exports';
import { getUserDetail } from './app.service';

Amplify.configure(configAppSync);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public title: string = 'DemoPortalV2';
    public access_token: any;
    public isLoginPage: any;
    public UrlPage: boolean = false;

    public isLogin: any;
    public isForgotPassword: any = false;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        // this.checkForgotPassword();
        this.checkLoginPage();
        if (this.access_token) this.checkUserDetail();
    }

    checkLoginPage() {
        this.isLoginPage = localStorage.getItem('isLogin');
        this.access_token = localStorage.getItem('access_token');
        // console.log(">>>Check:", isLoginPage === JSON.stringify("true"));
        if (this.isLoginPage === JSON.stringify('true') && this.access_token) {
            this.isLogin = true;
            this.router.navigate(['v2/home-page']);
        } else {
            this.isLogin = false;
            this.router.navigate(['v2/login-page']);
        };
        // console.log(">>>Check isLogin:", this.isLogin);
    }

    async checkUserDetail() {
        let res = await getUserDetail();
        return;
    }

    // checkForgotPassword() {
    //     let isForgotPassword = localStorage.getItem('isForgotPassword');
    //     if (isForgotPassword === JSON.stringify('true')) {
    //         this.isForgotPassword = true;
    //         this.router.navigate(['v2/forgot-password-page']);
    //     } else {
    //         this.isForgotPassword = false;
    //     }
    // }

    // clearLocalStorage() {
    //     localStorage.removeItem('isForgotPassword');
    // }
}
