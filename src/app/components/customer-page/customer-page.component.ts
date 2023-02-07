import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { postListCustomer } from './customer-page.service';
import { Store } from '@ngrx/store';
import { RoleReducer } from 'src/_store/page.reducer';
import { FormPageData } from 'src/_store/page.reducer';
import { ModalDismissReasons, NgbModalConfig, NgbModal, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";
import { getDetailCustomer } from './customer-page.service';

@Component({
    selector: 'app-customer-page',
    templateUrl: './customer-page.component.html',
    styleUrls: ['./customer-page.component.scss']
})

export class CustomerPageComponent implements OnInit {
    public currentPage: number = 1;
    public lastCurrentPage: number = 1;
    public isCheckCurrentPage: boolean = false;
    public totalPage: any;
    public closeResult = '';

    public listURLCustomerPage: any = {
        'detail': false,
        'card': false
    }

    public filter: any = {
        cif: null, customerId: null, customerName: null, phoneNumber: null, email: null,
        kyc_type: null, diffRisk: null, finalRisk: null, segment: null, subsegment: null,
        dob: null
    };

    // Variable status box: Start
    public statusList: any = [
        { id: null, name: 'All' },
        { id: 'M', name: 'Manual KYC' },
        { id: 'V', name: 'Video KYC' },
        { id: 'E', name: 'eKYC' },
    ];
    // Variable status box: End

    // Variable statusRisk box: Start
    public statusRiskList: any = [
        { id: null, name: 'All' },
        { id: 'typical_high', name: 'Typical High Risk' },
        { id: 'default_high', name: 'Default High Risk' },
        { id: 'low', name: 'Low Risk' },
        { id: 'N/A', name: 'Not Available' }
    ];
    // Variable statusRisk box: End

    // Variable diffRisk box: Start
    public diffRiskList: any = [
        { id: null, name: 'All' },
        { id: 'yes', name: 'Diff auto from cron' },
    ];
    // Variable diffRisk box: End

    // Variable segment box: Start
    public segmentList: any = [
        { id: null, name: 'All' },
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
    public subsegmentList: any = [
        { id: null, name: 'All' },
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

    public listGender: any = [
        { id: 'M', name: 'Male' },
        { id: 'F', name: 'Female' }
    ]
    // Variable listUser
    public listUsers: any;
    public customerEdit: any = {};
    public customerDetail: any;
    public cloneCustomerEdit: any = {};
    // 
    constructor(
        private router: Router,
        private store: Store<FormPageData>,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        private formatter: NgbDateParserFormatter
    ) {
        // customize default values of modals used by this component tree
		this.config.backdrop = 'static';
		this.config.keyboard = false;
        this.config.size = 'xl'
    }

    ngOnDestroy() {}

    ngOnChanges() {
        this.lastCurrentPage = this.currentPage;
        console.log(this.customerEdit);
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.fetchListCustomer(this.currentPage - 1, 10, {});
    }

    ngDoCheck() {
        // console.log(">>>Check status:", this.status);
        this.checkRouter();
        if (this.lastCurrentPage !== this.currentPage) {
            // console.log("Check last:", this.lastCurrentPage);
            // console.log("Check current:", this.currentPage);
            this.lastCurrentPage = this.currentPage;
            let skip = (this.currentPage - 1)*10;
            this.fetchListCustomer(skip, 10, {}).then(res => res).catch(err => err);
        }
    }

    // Handle close modal: start
    private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
    // Handle close modal: end

    // Check status content for page customer: start
    checkRouter() {
        let currentUrlName = this.router.url;
        this.listURLCustomerPage = {
            'detail': false,
        };
        Object.keys(this.listURLCustomerPage).map(keyName => {
            let key = currentUrlName.split('/').slice(-1)[0];
            if (keyName === key) this.listURLCustomerPage[key] = true;
        })
        // console.log(">>>Check URL Customer:", this.listURLCustomerPage);
    }
    // Check status content for page customer: end

    // View detail customer: Start
    viewCustomerDetail() {
        this.router.navigate(['v2/customer-page/detail']);
    }
    // View detail customer: End

    async editCustomerDetail(content: any, item: any) {
        console.log(">>>Check edit customer:", item);
        await this.handleGetDetailCustomer(item.cifId);
        console.log(">>>Check detail customer:", this.customerDetail);

        this.customerEdit = item;
        this.cloneCustomerEdit = _.cloneDeep(this.customerEdit);
        this.cloneCustomerEdit['gender'] = this.customerDetail?.customerInqRs?.gender;

        // Processing format time: START
        this.cloneCustomerEdit.dob = this.handleConvertFormatDOB('dob', this.cloneCustomerEdit.dob);
        this.cloneCustomerEdit.ekycDate = this.handleConvertFormatDOB('ekycDate', this.cloneCustomerEdit.ekycDate);
        // console.log(">>>Check dob customer:", this.cloneCustomerEdit.dob);
        // Processing format time: END

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
    }

    handleConvertFormatDOB(key: string, day: string) {
        let splitArray = day.split('-');
        
        if (key === 'dob') {
            const date: NgbDate = new NgbDate(Number(splitArray[2]), Number(splitArray[1]), Number(splitArray[0]));
            let timeConvert = this.formatter.format(date);
            // console.log(">>>Check timeConvert:", timeConvert);
            return timeConvert;
        } else {
            const date: NgbDate = new NgbDate(Number(splitArray[0]), Number(splitArray[1]), Number(splitArray[2]));
            let timeConvert = this.formatter.format(date);
            // console.log(">>>Check timeConvert:", timeConvert);
            return timeConvert;
        }
    }

    async fetchListCustomer(skip: number, limit: number, filter: object) {
        // console.log(">>>Check currentPage:", this.currentPage);
        let res = await postListCustomer(skip, limit, filter);
        // console.log("Check res:", res);
        if (res && res?.status === 200) {
            this.totalPage = res?.data?.total;
            this.listUsers = res?.data?.hits;
            if (this.totalPage === 1) this.clearInputSearch();
        }
        // console.log(">>>Check listUsers:", this.listUsers, this.totalPage);
        return res;
    }

    async handleGetDetailCustomer(cifId: any) {
        let res = await getDetailCustomer(cifId);
        // console.log(">>>Check res:", res);
        if (res && res?.status === 200) {
            this.customerDetail = res?.data?.detail;
            // console.log(">>>Check detail customer:", this.customerDetail);
        }
    }

    clearInputSearch() {
        this.filter = {
            cif: null, customerId: null, customerName: null, phoneNumber: null, email: null,
            kyc_type: null, diffRisk: null, finalRisk: null, segment: null, subsegment: null,
            dob: null
        };
    }

    handleSearchCustomer() {
        // console.log(">>>Check filter search:", this.filter);
        this.fetchListCustomer(0, 10, this.filter);
    }
}
