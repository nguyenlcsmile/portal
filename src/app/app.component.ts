import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Amplify } from "@aws-amplify/core";
import { Store } from '@ngrx/store';
import configAppSync from '../aws-exports';
import { FormPageData } from 'src/_store/page.reducer';
import { getUserDetail } from './app.service';

Amplify.configure(configAppSync);

export let browserRefresh = false;

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
        private router: Router,
        private store: Store<FormPageData>
    ) {}

    ngOnInit(): void {
        this.store.select('isLogin').subscribe(res => {
            // Get infor from localStage: Start
            this.access_token = localStorage.getItem('access_token');
            // Get infor from localStage: End
            
            // console.log("Check res:", res);
            // Check page login: Start
            if (this.access_token && this.router.url.includes('/home-page')) {
                this.isLogin = true;
                this.router.navigate(['v2/home-page']);
            } else if (this.access_token && !this.router.url.includes('/home-page')) {
                this.isLogin = true;
                // this.router.navigate(['v2/home-page']);
            } else {
                this.isLogin = false;
                this.router.navigate(['v2/login-page']);
            }
            // Check page login: End
            // console.log(">>>Check isLogin:", this.access_token);
        });
        if (this.access_token) this.checkUserDetail();
        // if (browserRefresh) this.router.navigate([`v2/monitor-page`]);
    }

    async checkUserDetail() {
        let res = await getUserDetail();
        return;
    }
}
