import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Amplify } from "@aws-amplify/core";
import { Store } from '@ngrx/store';
import configAppSync from '../aws-exports';
import { FormPageData } from 'src/_store/page.reducer';
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
    public isLoginPage: any = false;
    public isLogin: any;
    public isCheckRole: any = null;
    public isCheckRoleGet: any = false;

    constructor(
        private router: Router,
        private store: Store<FormPageData>
    ) {
        // this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationStart) {
        //         this.isCheckReload = !router.navigated;
        //         console.log("Check isCheckRole:", this.isCheckRole);
        //     }
        // });
    }

    ngOnInit(): void {}

    ngDoCheck() {
        this.store.select('isLogin').subscribe(res => {
            // Get infor from localStage: Start
            this.access_token = localStorage.getItem('access_token');
            this.isLogin = localStorage.getItem('isLogin');
            // Get infor from localStage: End
            // console.log("Check res:", res);

            // Check page login: Start
            if (this.access_token && this.isLogin && this.router.url.includes('home-page')) {
                this.isLoginPage = true;
                return;
            } else if (this.access_token && this.isLogin && !this.router.url.includes('home-page') && !this.router.url.includes('login-page')) {
                this.isLoginPage = true;
                localStorage.setItem('isLogin', JSON.stringify('true'));
                return;
            }
            else this.isLoginPage = false;
            // Check page login: End
        });
    }


    ngAfterViewInit() {
        if (this.access_token) this.checkUserDetail();
        console.log(this.router.url);
        if (this.isLoginPage) {
            if (this.isLogin === JSON.stringify('false') ) {
                this.router.navigate(['v2/home-page']);
                return;
            } else {
                return;
            }
        };
        this.router.navigate(['v2/login-page']);
    }

    async checkUserDetail() {
        let res = await getUserDetail();
        // console.log(">>>Check res:", res);
        if (res && res?.status === 200) {
            this.isCheckRole = res?.data?.roles?.admin;
            this.isCheckRoleGet = true;
        }
    }
}
