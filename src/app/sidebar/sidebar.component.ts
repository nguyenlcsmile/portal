import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    statusElementSidebar: any = {
        'monitor-page': '',
        'customer-page': ''
    };

    constructor(
        private router: Router,
    ) {}

    ngOnInit(): void {}

    ngDoCheck() {
        let currentUrlName = this.router.url;
        // console.log(">>>Check currentname:", currentUrlName);
        this.statusElementSidebar = {
            'monitor-page': '',
            'customer-page': ''
        }
        Object.keys(this.statusElementSidebar).map(keyName => {
            let key = currentUrlName.split('/').slice(-1)[0];
            if (keyName === key) this.statusElementSidebar[key] = 'active';
        })
        // console.log(">>>Check status sidebar:", this.statusElementSidebar);
    }
    
}
