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
    public isRoleEdit: boolean = false;
    public isRoleUser: boolean = false;

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
            if (this.userDetail?.roles?.admin) {
                this.userDetail.roles.admin = this.userDetail?.roles?.admin[0].toUpperCase() + this.userDetail?.roles?.admin.slice(1);
            } else {
                this.isRoleUser = true;
            }

            let inforCustomer = res?.data?.roles?.app?.customer;
            // console.log(">>>Check inforCustomer:", this.isRoleUser);
            Object.keys(inforCustomer).map(index => {
                // console.log(inforCustomer[item]);
                if (inforCustomer[index] === 'edit_info') {
                    this.isRoleEdit = true;
                }
            })
        }
    }

    handleNavigate(type: string) {
        if (type === 'Customer') {
            let enCodeRoleEdit = btoa(unescape(encodeURIComponent(JSON.stringify(this.isRoleEdit))));
            this.router.navigate(['v2/customer-page'], { state: { isRoleEdit: enCodeRoleEdit } })
            return;
        }
    }

    ngAfterViewInit() {}
}
