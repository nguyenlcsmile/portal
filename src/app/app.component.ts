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
    ) {}

    ngOnInit(): void {
        let isLogin = localStorage.getItem('isLogin');
        console.log(">>>Check:", isLogin);
        if (isLogin) {
            this.isLogin = true;
            this.router.navigate(['/home-page']);
        }
        else this.isLogin = false;
        console.log(">>>Check isLogin:", this.isLogin);
    }
}
