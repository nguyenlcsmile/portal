import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { getDetailCustomer } from '../customer-page.service';

@Component({
    selector: 'app-detail-page',
    templateUrl: './customer-detail-page.component.html',
    styleUrls: ['./customer-detail-page.component.scss'],
})
export class CustomerDetailPageComponent implements OnInit {
    public cifId: any;
    public custDetail: any;
    public currentStatus: any;

    public listURLCustomerPage: any = {
        'detail': false,
        'card': false
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(params => {
            let decode_id = atob(params?.cifId);
            this.cifId = decode_id.split(':')[1];
            // console.log(">>>Check cifId:", this.cifId);
        })
    }

    ngOnInit(): void {
        this.getDetailCustomer(this.cifId);
    }

    async getDetailCustomer(cifId: any) {
        let res = await getDetailCustomer(cifId);
        // console.log(">>>Check res:", res);
        if (res && res?.status === 200) {
            this.custDetail = res?.data?.detail;
        }
    }
}
