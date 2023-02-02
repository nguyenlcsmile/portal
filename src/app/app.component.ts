import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public isLogin: any;
    public isForgotPassword: any = false;
    
    ngOnInit(): void {
        let isLogin = localStorage.getItem('isLogin');
        console.log(">>>Check:", isLogin);
        if (isLogin) this.isLogin = true;
        else this.isLogin = false;
        console.log(">>>Check isLogin:", this.isLogin);
    }
}
