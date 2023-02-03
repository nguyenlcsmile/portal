import { Component, OnInit } from '@angular/core';
// import { APIService } from 'src/app/API.service';

@Component({
    selector: 'app-monitor-page',
    templateUrl: './monitor-page.component.html',
    styleUrls: ['./monitor-page.component.scss']
})

export class MonitorPageComponent implements OnInit {

    // Variable for box system error: Start
    public arrSystemErrorsDaily: any = [
        {
            name: 'BackBase',
            value: 0
        },
        {
            name: 'Pega',
            value: 0
        },
        {
            name: 'CleverTab',
            value: 0
        },
        {
            name: 'ESB',
            value: 0
        },
        {
            name: 'FPT_EContract',
            value: 0
        },
        {
            name: 'Finacle',
            value: 0
        },
        {
            name: 'HyperVerge',
            value: 0
        },
        {
            name: 'PegaCrm',
            value: 0
        },
        {
            name: 'PegaLos',
            value: 0
        },
        {
            name: 'Robo',
            value: 0
        },
        {
            name: 'SmsGateWay',
            value: 0
        },
        {
            name: 'Taseco',
            value: 0
        },
        {
            name: 'Tutuka',
            value: 0
        },
        {
            name: 'Ubit',
            value: 0
        },
        {
            name: 'VietQR',
            value: 0
        },
        {
            name: 'Vymo',
            value: 0
        }
    ];

    public arrSystemErrorsWeek: any = [
        {
            name: 'BackBase',
            value: 0
        },
        {
            name: 'Pega',
            value: 0
        },
        {
            name: 'CleverTab',
            value: 0
        },
        {
            name: 'ESB',
            value: 0
        },
        {
            name: 'FPT_EContract',
            value: 0
        },
        {
            name: 'Finacle',
            value: 0
        },
        {
            name: 'HyperVerge',
            value: 0
        },
        {
            name: 'PegaCrm',
            value: 0
        },
        {
            name: 'PegaLos',
            value: 0
        },
        {
            name: 'Robo',
            value: 0
        },
        {
            name: 'SmsGateWay',
            value: 0
        },
        {
            name: 'Taseco',
            value: 0
        },
        {
            name: 'Tutuka',
            value: 0
        },
        {
            name: 'Ubit',
            value: 0
        },
        {
            name: 'VietQR',
            value: 0
        },
        {
            name: 'Vymo',
            value: 0
        }
    ];

    public arrSystemErrorsMonth: any = [
        {
            name: 'BackBase',
            value: 0
        },
        {
            name: 'Pega',
            value: 0
        },
        {
            name: 'CleverTab',
            value: 0
        },
        {
            name: 'ESB',
            value: 0
        },
        {
            name: 'FPT_EContract',
            value: 0
        },
        {
            name: 'Finacle',
            value: 0
        },
        {
            name: 'HyperVerge',
            value: 0
        },
        {
            name: 'PegaCrm',
            value: 0
        },
        {
            name: 'PegaLos',
            value: 0
        },
        {
            name: 'Robo',
            value: 0
        },
        {
            name: 'SmsGateWay',
            value: 0
        },
        {
            name: 'Taseco',
            value: 0
        },
        {
            name: 'Tutuka',
            value: 0
        },
        {
            name: 'Ubit',
            value: 0
        },
        {
            name: 'VietQR',
            value: 0
        },
        {
            name: 'Vymo',
            value: 0
        }
    ];
    // Variable for box system error: End

    constructor(
        // private apiAppSync: APIService,
    ) { }

    ngOnInit(): void {
        // sub data from appSync
        // this.apiAppSync.SubscribeToNewMessageListener().subscribe({
        //     next: async (data) => {
        //         console.log(">>>Check:", data);
        //     }
        // })
    }

}
