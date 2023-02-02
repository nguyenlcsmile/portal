import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public isLogin: any;
    public isForgotPassword: any = false;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        this.checkLoginPage();
    }

    checkLoginPage() {
        const isLoginPage = localStorage.getItem('isLogin');
        const access_token = localStorage.getItem('access_token');
        // console.log(">>>Check:", isLoginPage === JSON.stringify("true"));
        if (isLoginPage === JSON.stringify('true') && access_token) {
            this.isLogin = true;
            this.router.navigate(['/home-page']);
        }
        else {
            this.isLogin = false;
            this.router.navigate(['/login-page']);
        };
        // console.log(">>>Check isLogin:", this.isLogin);
    }
}
