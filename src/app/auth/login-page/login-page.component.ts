import { Component, OnInit } from '@angular/core';
import { postAccessToken } from './login-page.service';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Store } from '@ngrx/store';

import { handleLoginAction } from 'src/_store/page.actions';
import { FormPageData } from 'src/_store/page.reducer';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
    public isLoginPage: any = false;

    // Variable for loading page: Start
    public loading: any = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    public primaryColour = '#FFD700';
    public config = {
        animationType: ngxLoadingAnimationTypes.none,
        backdropBorderRadius: '3px',
    };
    // Variable for loading page: End

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
    public errorLogin: any = '';

    constructor(
        private router: Router,
        private store: Store<FormPageData>
    ) { }

    ngOnInit(): void {
        // Remove localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('isLogin');
    }

    // Call api get Token for login Portal: Start
    async handleLoginPage() {
        // Validation username && password
        // console.log(">>>Check handle login page")
        if (this.account.username.value === '' || this.account.password.value === '') {
            this.account.username.value === '' ? this.account.username.valid = true : this.account.username.valid = false;
            this.account.password.value === '' ? this.account.password.valid = true : this.account.password.valid = false;
            return;
        }

        // post Token
        let res = await postAccessToken(this.account.username.value, this.account.password.value);
        // console.log(">>>Check res:", res);
        if (res && res['status'] === 200) {
            this.loading = true;
            setTimeout(() => {
                let access_token = res['data']['data']['AccessToken']
                localStorage.setItem('access_token', JSON.stringify(access_token));
                localStorage.setItem('isLogin', JSON.stringify('true'));
                this.store.dispatch(handleLoginAction());
                this.router.navigate(['v2/home-page']);
                location.reload();
            }, 1000);
        } else {
            // console.log(">>>Check login:", res['message']);
            this.errorLogin = 'Incorrect username or password.';
        }
    }

    handleShowPassword() {
        this.account.showPassword = !this.account.showPassword;
    }
}
