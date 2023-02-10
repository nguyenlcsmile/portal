import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormPageData } from 'src/_store/page.reducer';
import { Router } from '@angular/router';
import { getUserDetail } from 'src/app/app.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
    public access_token: any;
    public isCheckRole: any = null;
    
    constructor(
        private router: Router,
        private store: Store<FormPageData>
    ) {}

    ngOnInit(): void {}

    async checkUserDetail() {
        let res = await getUserDetail();
        // console.log(">>>Check res:", res);
        if (res && res?.status === 200) {
            this.isCheckRole = res?.data?.roles?.admin;
        }
    }
}
