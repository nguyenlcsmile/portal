import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {}

    logOut() {
        localStorage.removeItem('access_token');
        this.router.navigate(['v2/login-page']);
    }

}
