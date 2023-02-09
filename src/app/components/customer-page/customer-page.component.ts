import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { postListCustomer } from './customer-page.service';
import { Store } from '@ngrx/store';
import { RoleReducer } from 'src/_store/page.reducer';
import { FormPageData } from 'src/_store/page.reducer';
import { ModalDismissReasons, NgbModalConfig, NgbModal, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";
import { getDetailCustomer, getAddressCustomer, postUpdateCustomer } from './customer-page.service';
import { getUserDetail } from 'src/app/app.service';
import { handleRoleAction } from 'src/_store/page.actions';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
    selector: 'app-customer-page',
    templateUrl: './customer-page.component.html',
    styleUrls: ['./customer-page.component.scss']
})

export class CustomerPageComponent implements OnInit {
    // Variable for loading page: Start
    public loading: any = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    public primaryColour = '#FFD700';
    // Variable for loading page: End

    public isRoleEdit: boolean = false;

    public currentPage: number = 1;
    public lastCurrentPage: number = 1;
    public isCheckCurrentPage: boolean = false;
    public totalPage: any;
    public closeResult = '';

    // Variable address Current Edit: Start
    public listProvince: any;
    public listDistrictCurrent: any;
    public listWardCurrent: any;
    public lastIdCurrentProvince: any;
    public lastIdCurrentDistrict: any;
    public onChangeProviceCurrent: boolean = true;
    public onChangeDistrictCurrent: boolean = true;
    // Variable address Current Edit: End

    // Variable address Permanent Edit: Start
    public listDistrictPermanent: any;
    public listWardPermanent: any;
    public lastIdPermanentProvince: any;
    public lastIdPermanentDistrict: any;
    public onChangeProvicePermanent: boolean = true;
    public onChangeDistrictPermanent: boolean = true;
    public isCheckEmpty: boolean = false;
    // Variable address Current Edit: End

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
    public dataTotal: any;
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
        this.config.size = 'xl';
    }

    ngOnDestroy() { }

    ngOnInit(): void {
        this.handleGetUserDetail();
        // Get list province: Start
        this.handleGetListAddressCurrent('province', 0);
        // Get list province: End
    }

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
            let skip = (this.currentPage - 1) * 10;
            this.fetchListCustomer(skip, 10, {}).then(res => res).catch(err => err);
        }

        // Check role edit
        this.store.select('isEdit').subscribe(res => {
            this.isRoleEdit = res;
        })

        // Check change address current: Start
        if (this.lastIdCurrentProvince !== this.cloneCustomerEdit?.idCurrentProvince) {
            // console.log(">>>Check idCurrentProvince:", this.cloneCustomerEdit?.idCurrentProvince);
            // console.log(">>>Check lastIdCurrentProvince:", this.lastIdCurrentProvince);
            this.lastIdCurrentProvince = this.cloneCustomerEdit?.idCurrentProvince;
            this.onChangeProviceCurrent = false;
            this.listWardCurrent = [];
            this.listDistrictCurrent = [];
            this.handleGetListAddressCurrent('district', this.cloneCustomerEdit?.idCurrentProvince).then(res => res).catch(err => err);
        }

        if (this.lastIdCurrentDistrict !== this.cloneCustomerEdit?.idCurrentDistrict) {
            // console.log(">>>Check idCurrentDistrict:", this.cloneCustomerEdit?.idCurrentDistrict);
            // console.log(">>>Check lastIdCurrentDistrict:", this.lastIdCurrentDistrict);
            this.lastIdCurrentDistrict = this.cloneCustomerEdit?.idCurrentDistrict;
            this.onChangeDistrictCurrent = false;
            this.handleGetListAddressCurrent('ward', this.cloneCustomerEdit?.idCurrentDistrict).then(res => res).catch(err => err);
        }
        // Check change address current: End

        // Check change address Permanent: Start
        if (this.lastIdPermanentProvince !== this.cloneCustomerEdit?.idPermanentProvince) {
            // console.log(">>>Check idPermanentProvince:", this.cloneCustomerEdit?.idPermanentProvince);
            // console.log(">>>Check lastIdPermanentProvince:", this.lastIdPermanentProvince);
            this.lastIdPermanentProvince = this.cloneCustomerEdit?.idPermanentProvince;
            this.onChangeProvicePermanent = false;
            this.listWardPermanent = [];
            this.listDistrictPermanent = [];
            this.handleGetListAddressPermanent('district', this.cloneCustomerEdit?.idPermanentProvince).then(res => res).catch(err => err);
        }

        if (this.lastIdPermanentDistrict !== this.cloneCustomerEdit?.idPermanentDistrict) {
            // console.log(">>>Check idPermanentDistrict:", this.cloneCustomerEdit?.idPermanentDistrict);
            // console.log(">>>Check lastIdPermanentDistrict:", this.lastIdPermanentDistrict);
            this.lastIdPermanentDistrict = this.cloneCustomerEdit?.idPermanentDistrict;
            this.onChangeDistrictPermanent = false;
            this.handleGetListAddressPermanent('ward', this.cloneCustomerEdit?.idPermanentDistrict).then(res => res).catch(err => err);
        }
        // Check change address Permanent: End
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
    async viewCustomerDetail(cifId: any) {
        await this.handleGetDetailCustomer(cifId, 'viewCustomer');
        let encodeCustomer = btoa(JSON.stringify(this.customerDetail));
        let encodeDataTotal = btoa(JSON.stringify(this.dataTotal));
        this.router.navigate(['v2/customer-page/detail'], { queryParams: { encodeCustomer: encodeCustomer, dataTotal: encodeDataTotal } });
    }
    // View detail customer: End

    async editCustomerDetail(content: any, item: any) {
        // console.log(">>>Check edit customer:", item);
        this.customerEdit = item;

        await this.handleGetDetailCustomer(item.cifId, 'editCustomer');
        this.loading = false;
        // console.log(">>>Check detail customer:", this.customerDetail);

        this.cloneCustomerEdit = _.cloneDeep(this.customerEdit);
        this.lastIdCurrentProvince = this.cloneCustomerEdit?.idCurrentProvince;
        this.lastIdCurrentDistrict = this.cloneCustomerEdit?.idCurrentDistrict;

        this.lastIdPermanentProvince = this.cloneCustomerEdit?.idPermanentProvince;
        this.lastIdPermanentDistrict = this.cloneCustomerEdit?.idPermanentDistrict;

        // Get detail info customer: start
        this.cloneCustomerEdit.dob = this.customerDetail?.customerInqRs?.dob;
        this.cloneCustomerEdit['fullName'] = this.customerDetail?.fullName;
        this.cloneCustomerEdit['firstName'] = this.customerDetail?.customerInqRs?.firstName;
        this.cloneCustomerEdit['middleName'] = this.customerDetail?.customerInqRs?.middleName;
        this.cloneCustomerEdit['lastName'] = this.customerDetail?.customerInqRs?.lastName;
        this.cloneCustomerEdit['phoneNo'] = this.customerDetail?.customerInqRs?.phoneNo;
        this.cloneCustomerEdit['gender'] = this.customerDetail?.customerInqRs?.gender;
        this.cloneCustomerEdit['currentAddrDetails'] = this.customerDetail?.customerInqRs?.currentAddrDetails;
        this.cloneCustomerEdit['permanentAddrDetails'] = this.customerDetail?.customerInqRs?.permanentAddrDetails;
        this.cloneCustomerEdit['identificationDocumentDtls1'] = this.customerDetail?.customerInqRs?.identificationDocumentDtls1;
        // Get detail info customer: end

        // Processing format time: START
        this.cloneCustomerEdit.dob = this.handleConvertFormatDOB('day-week-year', this.cloneCustomerEdit?.dob);
        this.cloneCustomerEdit.ekycDate = this.handleConvertFormatDOB('year-week-day', this.cloneCustomerEdit?.ekycDate);
        this.cloneCustomerEdit.identificationDocumentDtls1.expiryDate = this.handleConvertFormatDOB('day-week-year', this.cloneCustomerEdit?.identificationDocumentDtls1?.expiryDate);
        this.cloneCustomerEdit.identificationDocumentDtls1.issueDate = this.handleConvertFormatDOB('day-week-year', this.cloneCustomerEdit?.identificationDocumentDtls1?.issueDate);
        this.cloneCustomerEdit.identificationDocumentDtls1.placeOfIssue = Number(this.cloneCustomerEdit?.identificationDocumentDtls1?.placeOfIssue);
        // console.log(">>>Check cloneCustomerEdit customer:", this.cloneCustomerEdit);
        // Processing format time: END

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
                this.onChangeDistrictCurrent = true;
                this.onChangeProviceCurrent = true;
                this.onChangeDistrictPermanent = true;
                this.onChangeProvicePermanent = true;
            },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            },
        );
    }

    async handleGetListAddressCurrent(type: string, id: number) {
        if (type === 'province') {
            let resAddProvince = await getAddressCustomer(type, id);
            // console.log(">>>Check resAddProvince:", resAddProvince);
            if (resAddProvince && resAddProvince?.status === 200) {
                this.listProvince = resAddProvince?.data?.data?.data;
                // console.log(">>>Check listProvince:", this.listProvince);
                return;
            }
        } else if (type === 'district') {
            let resAddressDis = await getAddressCustomer('district', id);
            if (resAddressDis && resAddressDis?.status === 200) {
                // console.log(">>>Check res:", res);
                this.listDistrictCurrent = resAddressDis?.data?.data?.data;
                return;
            }
        } else {
            let resAddressWard = await getAddressCustomer('ward', id);
            if (resAddressWard && resAddressWard?.status === 200) {
                // console.log(">>>Check res:", res);
                this.listWardCurrent = resAddressWard?.data?.data?.data;
                return;
            }
        }
    }

    async handleGetListAddressPermanent(type: string, id: number) {
        if (type === 'district') {
            let resAddressDis = await getAddressCustomer('district', id);
            if (resAddressDis && resAddressDis?.status === 200) {
                // console.log(">>>Check res:", res);
                this.listDistrictPermanent = resAddressDis?.data?.data?.data;
                return;
            }
        } else {
            let resAddressWard = await getAddressCustomer('ward', id);
            if (resAddressWard && resAddressWard?.status === 200) {
                // console.log(">>>Check res:", res);
                this.listWardPermanent = resAddressWard?.data?.data?.data;
                return;
            }
        }
    }

    handleConvertFormatDOB(key: string, day: string) {
        let splitArray = day.split('-');

        if (key === 'day-week-year') {
            const date: NgbDate = new NgbDate(Number(splitArray[2]), Number(splitArray[1]), Number(splitArray[0]));
            let timeConvert = this.formatter.format(date);
            // console.log(">>>Check timeConvert:", timeConvert, typeof timeConvert);
            return timeConvert;
        } else if (key == 'ymd-dmw') {
            return (splitArray[2] + '-' + splitArray[1] + '-' + splitArray[0]).toString();
        }
        else {
            const date: NgbDate = new NgbDate(Number(splitArray[0]), Number(splitArray[1]), Number(splitArray[2]));
            let timeConvert = this.formatter.format(date);
            // console.log(">>>Check timeConvert:", timeConvert);
            return timeConvert;
        }
    }

    handleSelectDay(event: any, type: string) {
        // this.cloneCustomerEdit?.identificationDocumentDtls1.issueDate
        let timeConvert = this.formatter.format(event);
        if (type === 'issueDate') this.cloneCustomerEdit.identificationDocumentDtls1.issueDate = timeConvert;
        if (type === 'expireDate') this.cloneCustomerEdit.identificationDocumentDtls1.expiryDate = timeConvert;
        if (type === 'dob') this.cloneCustomerEdit.dob = timeConvert;

        return timeConvert;
    }

    async fetchListCustomer(skip: number, limit: number, filter: object) {
        // console.log(">>>Check currentPage:", this.currentPage);
        let res = await postListCustomer(skip, limit, filter);
        // console.log("Check res:", res);
        if (res && res?.status === 200) {
            this.totalPage = res?.data?.total;
            this.listUsers = res?.data?.hits;
            this.clearInputSearch();
        }
        // console.log(">>>Check listUsers:", this.listUsers, this.totalPage);
        return res;
    }

    async handleGetUserDetail() {
        let res = await getUserDetail();
        if (res && res?.status === 200) {
            let inforCustomer = res?.data?.roles?.app?.customer;
            // console.log(">>>Check inforCustomer:", inforCustomer);
            Object.keys(inforCustomer).map(index => {
                // console.log(inforCustomer[item]);
                if (inforCustomer[index] === 'edit_info') {
                    this.store.dispatch(handleRoleAction());
                }
            })
        }
    }

    async handleGetDetailCustomer(cifId: any, action: string) {
        this.loading = true;
        let res = await getDetailCustomer(cifId);
        // console.log(">>>Check res:", res);
        if (res && res?.status === 200) {
            this.dataTotal = res?.data;
            this.customerDetail = res?.data?.detail;
            if (action === 'viewCustomer') return;

            if (this.customerDetail) {
                let idProvinceCurrent = Number(this.customerDetail?.customerInqRs?.currentAddrDetails?.province);
                let idDistrictCurrent = Number(this.customerDetail?.customerInqRs?.currentAddrDetails?.district);
                let idWardCurrent = Number(this.customerDetail?.customerInqRs?.currentAddrDetails?.ward);

                let idProvincePermanent = Number(this.customerDetail?.customerInqRs?.permanentAddrDetails?.province);
                let idDistrictPermanent = Number(this.customerDetail?.customerInqRs?.permanentAddrDetails?.district);
                let idWardPermanent = Number(this.customerDetail?.customerInqRs?.permanentAddrDetails?.ward);

                //Get current address: start
                this.customerEdit['idCurrentProvince'] = idProvinceCurrent;
                let resAddressDisCurrent = await getAddressCustomer('district', idProvinceCurrent);
                if (resAddressDisCurrent && resAddressDisCurrent?.status === 200) {
                    this.customerEdit['idCurrentDistrict'] = idDistrictCurrent;
                    this.listDistrictCurrent = resAddressDisCurrent?.data?.data?.data;
                    // console.log("Check resAddress:", resAddressDis);
                }

                let resAddressWardCurrent = await getAddressCustomer('ward', idDistrictCurrent);
                if (resAddressWardCurrent && resAddressWardCurrent?.status === 200) {
                    this.customerEdit['idCurrentWard'] = idWardCurrent;
                    this.listWardCurrent = resAddressWardCurrent?.data?.data?.data;
                    // console.log("Check listWard:", this.listWard);
                }
                //Get current address: end

                //Get Permanent address: start
                this.customerEdit['idPermanentProvince'] = idProvincePermanent;
                let resAddressDis = await getAddressCustomer('district', idProvincePermanent);
                if (resAddressDis && resAddressDis?.status === 200) {
                    this.customerEdit['idPermanentDistrict'] = idDistrictPermanent;
                    this.listDistrictPermanent = resAddressDis?.data?.data?.data;
                    // console.log("Check resAddress:", resAddressDis);
                }

                let resAddressWard = await getAddressCustomer('ward', idDistrictPermanent);
                if (resAddressWard && resAddressWard?.status === 200) {
                    this.customerEdit['idPermanentWard'] = idWardPermanent;
                    this.listWardPermanent = resAddressWard?.data?.data?.data;
                }
                //Get Permanent address: end
            }
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

    addZeroToNumber(your_number: number, length: number) {
        var num = '' + your_number;
        while (num.length < length) {
            num = '0' + num;
        }
        return num.toString();
    }

    async handleUpdateCustomer(modal: any) {
        // console.log(">>>>Check info customer:", this.cloneCustomerEdit);

        // Change id current address: Start
        this.cloneCustomerEdit.currentAddrDetails.province = this.addZeroToNumber(this.cloneCustomerEdit?.idCurrentProvince, 5);
        this.cloneCustomerEdit.currentAddrDetails.district = this.addZeroToNumber(this.cloneCustomerEdit?.idCurrentDistrict, 5);
        this.cloneCustomerEdit.currentAddrDetails.ward = this.addZeroToNumber(this.cloneCustomerEdit?.idCurrentWard, 5);
        // Change id current address: End

        // Change id permanent address: Start
        this.cloneCustomerEdit.permanentAddrDetails.province = this.addZeroToNumber(this.cloneCustomerEdit?.idPermanentProvince, 5);
        this.cloneCustomerEdit.permanentAddrDetails.district = this.addZeroToNumber(this.cloneCustomerEdit?.idPermanentDistrict, 5);
        this.cloneCustomerEdit.permanentAddrDetails.ward = this.addZeroToNumber(this.cloneCustomerEdit?.idPermanentWard, 5);
        // Change id permanent address: End

        // Change date identification: Start
        this.cloneCustomerEdit.identificationDocumentDtls1.placeOfIssue = this.addZeroToNumber(this.cloneCustomerEdit?.identificationDocumentDtls1?.placeOfIssue, 5)
        this.cloneCustomerEdit.identificationDocumentDtls1.issueDate = this.handleConvertFormatDOB('ymd-dmw', this.cloneCustomerEdit?.identificationDocumentDtls1?.issueDate);
        this.cloneCustomerEdit.identificationDocumentDtls1.expiryDate = this.handleConvertFormatDOB('ymd-dmw', this.cloneCustomerEdit?.identificationDocumentDtls1?.expiryDate);
        this.cloneCustomerEdit.dob = this.handleConvertFormatDOB('ymd-dmw', this.cloneCustomerEdit?.dob);
        // Change date identification: end

        let cifId = this.cloneCustomerEdit?.cifId;
        let dataUpdate = {
            gender: this.cloneCustomerEdit?.gender,
            dob: this.cloneCustomerEdit?.dob,
            firstName: this.cloneCustomerEdit?.firstName,
            middleName: this.cloneCustomerEdit?.middleName,
            lastName: this.cloneCustomerEdit?.lastName,
            currentAddrDetails: this.cloneCustomerEdit?.currentAddrDetails,
            permanentAddrDetails: this.cloneCustomerEdit?.permanentAddrDetails,
            identificationDocumentDtls1: this.cloneCustomerEdit?.identificationDocumentDtls1
        }
        console.log(">>>Check dataUpate:", dataUpdate);

        this.loading = true;
        if (this.listDistrictCurrent.length !== 0 && this.listDistrictPermanent.length !== 0 && this.listWardCurrent.length !== 0 && this.listWardPermanent !== 0) {
            let res = await postUpdateCustomer(dataUpdate, cifId);
            console.log(">>>Check res:", res);

            if (res && res?.status === 200) {
                this.loading = false;
                modal.close('Save click');
            } else {
                let message = res?.data?.message;
                if (message === "Error when update data") {
                    this.loading = false;
                    this.isCheckEmpty = true;
                }
            }
        } else {
            this.loading = false;
            this.isCheckEmpty = true;
        }
    }
}
