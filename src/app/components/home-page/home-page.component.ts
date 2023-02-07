import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormPageData } from 'src/_store/page.reducer';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
    public access_token: any;

    constructor(
        private router: Router,
        private store: Store<FormPageData>
    ) {}

    ngOnInit(): void {}

}
