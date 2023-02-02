import { Component, OnInit } from '@angular/core';
import { postAccessToken } from './login-page.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    public account: any = {
        username: {
            valid: false,
            value: ''
        },
        password: {
            valid: false,
            value: ''
        },
        showPassword: false
    }
    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        // Remove access_token
        // localStorage.removeItem('access_token');
    }

    // Call api get Token for login Portal: Start
    async handleLoginPage() {
        // Validation username && password
        console.log(">>>Check handle login page")
        this.account.username.value === '' ? this.account.username.valid = true : this.account.username.valid = false;
        this.account.password.value === '' ? this.account.password.valid = true : this.account.password.valid = false;

        // post Token
        let res = await postAccessToken(this.account.username.value, this.account.password.value);
        console.log(">>>Check res:", res);
        if (res && res['status'] === 200) {
            let access_token = res['data']['data']['AccessToken']
            localStorage.setItem('access_token', JSON.stringify(access_token));
            localStorage.setItem('isLogin', JSON.stringify('true'));
            this.router.navigate(['/home-page']);
        }
    }

    handleShowPassword() {
        this.account.showPassword = !this.account.showPassword;
    }
}
