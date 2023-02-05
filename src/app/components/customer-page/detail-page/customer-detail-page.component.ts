import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-detail-page',
    templateUrl: './customer-detail-page.component.html',
    styleUrls: ['./customer-detail-page.component.scss'],
})
export class CustomerDetailPageComponent implements OnInit {
    public listURLCustomerPage: any = {
        'detail': false,
        'card': false
    }

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }
}
