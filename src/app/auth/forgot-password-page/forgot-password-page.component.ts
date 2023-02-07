import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {
    public username: any =  {
        valid: false,
        value: ''
    };

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        localStorage.removeItem('isForgotPassword');
    }

    handleForgotPassword() {
        if (this.username.value === '') {
            this.username.valid = true;
            return;
        } else {
            this.username.valid = false;
            this.router.navigate(['v2/login-page']);
            location.reload();
        }
    }

}
