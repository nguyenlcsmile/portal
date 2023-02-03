import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title: string = 'DemoPortalV2';

    public isLogin: any;
    public isForgotPassword: any;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        this.checkLoginPage();
        this.checkForgotPassword();
    }

    checkLoginPage() {
        let isLoginPage = localStorage.getItem('isLogin');
        let access_token = localStorage.getItem('access_token');
        // console.log(">>>Check:", isLoginPage === JSON.stringify("true"));
        if (isLoginPage === JSON.stringify('true') && access_token) {
            this.isLogin = true;
            this.router.navigate(['v2/home-page']);
        } else {
            this.isLogin = false;
            this.router.navigate(['v2/login-page']);
        };
        // console.log(">>>Check isLogin:", this.isLogin);
    }

    checkForgotPassword() {
        let isForgotPassword = localStorage.getItem('isForgotPassword');
        if (isForgotPassword === JSON.stringify('true')) {
            this.isForgotPassword = true;
            this.router.navigate(['v2/forgot-password-page']);
        } else {
            this.isForgotPassword = false;
        }
    }
}
