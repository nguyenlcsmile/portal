import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUserDetail } from '../app.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

    public userDetail: any;

    statusElementSidebar: any = {
        'monitor-page': '',
        'customer-page': ''
    };

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { 
        this.checkUserDetail();
    }

    ngDoCheck() {
        let currentUrlName = this.router.url;
        // console.log(">>>Check currentname:", currentUrlName);
        this.statusElementSidebar = {
            'monitor-page': '',
            'customer-page': ''
        }
        Object.keys(this.statusElementSidebar).map(keyName => {
            if (currentUrlName.includes(keyName)) this.statusElementSidebar[keyName] = 'active';
        })
        // console.log(">>>Check status sidebar:", this.statusElementSidebar);
    }

    async checkUserDetail() {
        let res = await getUserDetail();
        if (res && res?.status === 200) {
            this.userDetail = res?.data;
            if (this.userDetail.roles.admin) {
                this.userDetail.roles.admin = this.userDetail?.roles?.admin[0].toUpperCase() + this.userDetail?.roles?.admin.slice(1);
            }
        }
    }

    ngAfterViewInit() {}
}
