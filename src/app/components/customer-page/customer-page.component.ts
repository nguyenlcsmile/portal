import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-page',
    templateUrl: './customer-page.component.html',
    styleUrls: ['./customer-page.component.scss']
})

export class CustomerPageComponent implements OnInit {
    public listURLCustomerPage: any = {
        'detail': false,
        'card': false
    }
    // Variable status box: Start
    public status = 'all';
    public statusList: any = [
        { id: 'all', name: 'All' },
        { id: 'M', name: 'Manual KYC' },
        { id: 'V', name: 'Video KYC' },
        { id: 'E', name: 'eKYC' },
    ];
    // Variable status box: End

    // Variable statusRisk box: Start
    public statusRisk = 'all';
    public statusRiskList: any = [
        { id: 'all', name: 'All' },
        { id: 'typical_high', name: 'Typical High Risk' },
        { id: 'default_high', name: 'Default High Risk' },
        { id: 'low', name: 'Low Risk' },
        { id: 'N/A', name: 'Not Available'}
    ];
    // Variable statusRisk box: End

    // Variable diffRisk box: Start
    public diffRisk = 'all';
    public diffRiskList: any = [
        { id: 'all', name: 'All' },
        { id: 'yes', name: 'Diff auto from cron' },
    ];
    // Variable diffRisk box: End

    // Variable segment box: Start
    public segment = 'all';
    public segmentList: any = [
        { id: 'all', name: 'All' },
        { id: 'OM', name: 'OM' },
        { id: 'FE', name: 'FE' },
        { id: 'PC', name: 'PC' },
        { id: 'PI', name: 'PI' },
        { id: 'FC', name: 'FC' },
        { id: 'FE', name: 'FE' },
        { id: 'ZA', name: 'ZA' },
    ];
    // Variable segment box: End

    // Variable subsegment box: Start
    public subsegment = 'all';
    public subsegmentList: any = [
        { id: 'all', name: 'All' },
        { id: 'O0', name: 'O0' },
        { id: 'P0', name: 'P0' },
        { id: 'P1', name: 'P1' },
        { id: 'P2', name: 'P2' },
        { id: 'P3', name: 'P3' },
        { id: 'P4', name: 'P4' },
        { id: 'N1', name: 'N1' },
        { id: 'N2', name: 'N2' },
        { id: 'Z0', name: 'Z0' },
        { id: 'ZN', name: 'ZN' },
        { id: 'F0P0', name: 'F0P0' },
        { id: 'F0P1', name: 'F0P1' },
        { id: 'F1P1', name: 'F1P1' },
        { id: 'F2P1', name: 'F2P1' },
        { id: 'F3P1', name: 'F3P1' },
        { id: 'F4P1', name: 'F4P1' },
        { id: 'F5P1', name: 'F5P1' },
        { id: 'F0P3', name: 'F0P3' },
        { id: 'F1P3', name: 'F1P3' },
        { id: 'F2P3', name: 'F2P3' },
        { id: 'F3P3', name: 'F3P3' },
        { id: 'F4P3', name: 'F4P3' },
        { id: 'F5P3', name: 'F5P3' },
        { id: 'F0N1', name: 'F0N1' },
        { id: 'F0N2', name: 'F0N2' },
    ];
    // Variable subsegment box: End

    constructor(
        private router: Router,
    ) {}

    ngOnInit(): void {}
    
    ngAfterViewInit() {}

    ngDoCheck() {
        // console.log(">>>Check status:", this.status);
        this.checkRouter();
    }

    // Check status content for page customer: start
    checkRouter() {
        let currentUrlName = this.router.url;
        this.listURLCustomerPage = {
            'detail': false,
            'card': false
        };
        Object.keys(this.listURLCustomerPage).map(keyName => {
            let key = currentUrlName.split('/').slice(-1)[0];
            if (keyName === key) this.listURLCustomerPage[key] = true;
        })
        // console.log(">>>Check URL Customer:", this.listURLCustomerPage);
    }
    // Check status content for page customer: end
}
