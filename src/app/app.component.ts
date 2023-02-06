import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
    // @ViewChild(LoginPageComponent) LoginPage!: LoginPageComponent;
    public title: string = 'DemoPortalV2';
    public access_token: any;
    public isLoginPage: any = false;

    constructor(
        private router: Router,
        private store: Store<FormPageData>
    ) { }

    ngOnInit(): void {
        // this.store.select('isLogin').subscribe(res => {
        //     // Get infor from localStage: Start
        //     this.access_token = localStorage.getItem('access_token');
        //     // Get infor from localStage: End
        //     // console.log("Check res:", res);

        //     // Check page login: Start
        // });
    }

    ngDoCheck() {
        this.store.select('isLogin').subscribe(res => {
            // Get infor from localStage: Start
            this.access_token = localStorage.getItem('access_token');
            // Get infor from localStage: End
            // console.log("Check res:", res);

            // Check page login: Start
            if (this.access_token && this.router.url.includes('/home-page')) {
                this.isLoginPage = true;
                return;
            } else if (this.access_token && !this.router.url.includes('/home-page') && !this.router.url.includes('/login-page')) {
                this.isLoginPage = true;
                return;
            }
            else this.isLoginPage = false;
            // Check page login: End
        });
    }

    ngAfterViewInit() {
        if (this.access_token) this.checkUserDetail();
        if (this.isLoginPage) {
            this.router.navigate(['v2/home-page']);
            return;
        };
        // if (this.isLogin === false && this.router.url.includes('/home-page')) this.router.navigate(['v2/home-page']);

        this.router.navigate(['v2/login-page']);
    }

    async checkUserDetail() {
        let res = await getUserDetail();
        // console.log(">>>Check res:", res);
    }
}
