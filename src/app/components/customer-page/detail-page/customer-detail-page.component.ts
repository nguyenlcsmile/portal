import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { getImageS3 } from '../customer-page.service';

@Component({
    selector: 'app-detail-page',
    templateUrl: './customer-detail-page.component.html',
    styleUrls: ['./customer-detail-page.component.scss'],
})
export class CustomerDetailPageComponent implements OnInit {
    public cifId: any;
    public custDetail: any;
    public currentStatus: any;
    public historyUpdate: any;
    public data: any;
    public accountId: any;

    // devphq >>>>> Start
    public image: any = '';
    public imageFrontNID: any = '';
    public imageBackNID: any = '';
    public kycSubmit: any;
    public videoKYC: any;
    public loadVkyc = false;
    public recordVideo: any;
    public videoImage: any = '';
    public videoImageFrontNID: any = '';
    public videoImageBackNID: any = '';
    public valueList = [
        { id: true, name: 'Yes' },
        { id: false, name: 'No' },
    ];
    public valueBlckList = false;
    public valuePEPList = false;
    public occupation: any = '';
    // devphq >>>>> End

    public listURLCustomerPage: any = {
        'detail': false,
        'card': false
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(params => {
            // this.custDetail = JSON.parse(decodeURIComponent(escape(window.atob(params?.encodeCustomer))));
            this.data = JSON.parse(decodeURIComponent(escape(window.atob(params?.dataTotal))));
            this.custDetail = this.data?.detail;
            this.kycSubmit = this.data.kyc_submit;
            this.videoKYC = this.data.video_kyc;
            this.accountId = this.data?.accountId;
            console.log(">>>Check accountId:", this.accountId);
            this.handleReasonStatusforKYCInfor(this.custDetail);
        })
    }

    ngOnInit(): void {
        this.initValue(this.data);
        this.getImageS3forDocument();
        this.getImageForVKYC();
    }

    // For header KYC Information >>>>> Start >>>>>> devquiphan
    handleReasonStatusforKYCInfor(custDetail: any) {
        if (custDetail['customerInqRs']) {
            let customer_inqr = custDetail['customerInqRs'];
            // console.log("Check customerInqRs>>>",customer_inqr);
            let current_status = "";
            // console.log("Check PIDStatus>>>",customer_inqr['PIDStatus'] ? customer_inqr['PIDStatus'] : null);
            if (customer_inqr['PIDStatus']) {
                let pid_status = customer_inqr['PIDStatus'];
                // console.log("Check PIDStatus>>>",pid_status);
                if (pid_status === 'C') {
                    current_status = "Cancel KYC, doing KYC again"
                } else if (pid_status === 'B') {
                    current_status = "KYC is blacklist"
                } else if (pid_status === 'HR') {
                    current_status = "KYC rejected"
                } else {
                    if (custDetail['signCasa']) {
                        let sign_casa = custDetail['signCasa'];
                        if (sign_casa == 'yes') {
                            current_status = 'KYC Success - Sign Casa Success';
                        } else if (sign_casa == 'fail') {
                            if (custDetail['reason_fail']) {
                                let reason_fail = custDetail['reason_fail'];
                                let reason_detail = 'FAIL OTP';
                                if (reason_fail) {
                                    let split_reason = reason_fail.split('&')
                                    if (split_reason[0] == 'failFace') {
                                        reason_detail = 'FAIL FACE MATCHING';
                                    }
                                }
                                current_status = 'KYC Success - Sign Casa is block ' + reason_detail
                            } else if (sign_casa == 'generate') {
                                current_status = 'KYC Success - Waiting customer sign Casa';
                            } else {
                                let uuid_kyc = custDetail['uuid_kyc'];
                                let identify2 = customer_inqr['identificationDocumentDtls2'];
                                let pid = identify2 ? identify2['uniqueId'] : '';
                                if (pid && uuid_kyc) {
                                    current_status = "KYC Successfully";
                                } else if (pid) {
                                    current_status = "KYC success";
                                } else if (uuid_kyc) {
                                    if (custDetail['uuid_pid']) {
                                        let uuid_pid = custDetail['uuid_pid'];
                                        if (uuid_pid) {
                                            if (custDetail['status_pid']) {
                                                let status_pid = custDetail['status_pid'];
                                                // console.log('TEST 1')
                                                if (status_pid != 'success') {
                                                    current_status = "Error when call PID";
                                                } else {
                                                    // console.log('TEST 2')
                                                    if (custDetail['data_pid']) {
                                                        let data_pid = custDetail['data_pid'];
                                                        if (data_pid) {
                                                            // console.log('TEST 3')
                                                            if (data_pid['data']) {
                                                                let data_param = data_pid['data'];
                                                                // console.log('TEST 4', data_param)
                                                                if (data_param) {
                                                                    // console.log('TEST 5')
                                                                    current_status = "Problem with Finacle - cannot update PID";
                                                                } else {
                                                                    // console.log('TEST 6')
                                                                    current_status = "Waiting PID from ROBO";
                                                                }
                                                            }
                                                        } else {
                                                            // console.log('TEST 7')
                                                            current_status = "Waiting PID from ROBO";
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            current_status = "Stuck when call PID";
                                        }
                                    }
                                } else {
                                    current_status = "Missing PID";
                                }
                            }
                        }
                    }
                }
                this.currentStatus = current_status;
            }
        }
    }

    // init data for Value AML 
    initValue(data: any) {
        this.valueBlckList = data?.detail?.riskBlckLst == 'low' ? false : true;
        this.valuePEPList = data?.detail?.riskPEP == 'low' ? false : true;
        this.occupation = this.getOccupation(data?.detail?.customerInqRs?.occuType);
    }

    // get Value Occupation
    getOccupation(type: any) {
        let job = '';
        switch (type) {
            case '00010':
                job = 'Comercial staff';
                break;
            case '00015':
                job = 'Consumer good self-employed';
                break;
            case '00012':
                job = 'Fashion self-employed';
                break;
            case '00006':
                job = 'Freelancer';
                break;
            case '00002':
                job = 'Military';
                break;
            case '00003':
                job = 'Police';
                break;
            case '00009':
                job = 'Production staff';
                break;
            case '00007':
                job = 'Retired';
                break;
            case '00005':
                job = 'Student';
                break;
            case '00004':
                job = 'Teacher';
                break;
            case '00011':
                job = 'Telecom staff';
                break;
            case '00014':
                job = 'Electronic self-employed';
                break;
            case '00001':
                job = 'Doctor';
                break;
            case '00013':
                job = 'Material self-employed';
                break;
            case '00008':
                job = 'Bank staff';
                break;
            default:
                job = 'N/A';
        }
        return job;
    }

    // Set color for AML
    setColor(value: any) {
        if (value) {
            if (value === 'N/A') {
                return 'badge bg-light';
            } else if (value === 'low') {
                return 'badge bg-success';
            } else if (value === 'medium') {
                return 'badge bg-warning';
            } else {
                return 'badge bg-danger';
            }
        } else {
            return 'badge bg-light';
        }
    }

    // get name for AML->final risk && historyUpdate value old and new
    getNameforFinalRisk(value: any, type: string) {
        if (type === 'old') value = value.old;
        if (type === 'new') value = value.new;

        if (value) {
            if (value === 'N/A') {
                return 'N/A';
            } else if (value === 'low') {
                return 'LOW RISK';
            } else if (value === 'high') {
                return 'HIGH RISK';
            } else if (value === 'typical_high') {
                return 'TYPICAL HIGH RISK';
            } else if (value === 'default_high') {
                return 'DEFAULT HIGH RISK';
            }
        }
        return "";
    }
    // get Name for Field of History Update
    getNameKeyofHisUpdate(key: any) {
        if (key == 'riskBlckLst') {
            return 'Black List Risk';
        } else if (key == 'riskPEP') {
            return 'PEP List Risk';
        } else if (key == 'finalRisk') {
            return 'Final Risk';
        } else {
            return 'Occupation Risk';
        }
    }

    // get Image
    async getImageS3forDocument() {
        // console.log("ChecK data for get Image>>>", this.image);
        if (this.kycSubmit) {
            if (this.kycSubmit.selfie) {
                let res = await getImageS3(this.kycSubmit.selfie);
                if (res.data) {
                    this.image = "data:image/jpeg;base64," + res?.data;
                }
            }
            if (this.kycSubmit.frontNid) {
                let res = await getImageS3(this.kycSubmit.frontNid);
                if (res.data) {
                    this.imageFrontNID = "data:image/jpeg;base64," + res?.data;
                }
            }
            if (this.kycSubmit.backNid) {
                let res = await getImageS3(this.kycSubmit.frontNid);
                if (res.data) {
                    this.imageBackNID = "data:image/jpeg;base64," + res?.data;
                }
            }
        }
    }

    async getImageForVKYC() {
        if (this.videoKYC) {
            if (this.videoKYC.face_captured && this.videoKYC.face_captured == 'Yes') {
                let res = await getImageS3(this.videoKYC.face_img);
                if (res.data) {
                    this.videoImage = "data:image/jpeg;base64," + res?.data;
                }
            }
            if (this.videoKYC.nid_front_captured && this.videoKYC.nid_front_captured == 'Yes') {
                let res = await getImageS3(this.videoKYC.nid_front_img);
                if (res.data) {
                    this.videoImageFrontNID = "data:image/jpeg;base64," + res?.data;
                }
            }
            if (this.videoKYC.nid_back_captured && this.videoKYC.nid_back_captured == 'Yes') {
                let res = await getImageS3(this.videoKYC.nid_back_img);
                if (res.data) {
                    this.videoImageBackNID = "data:image/jpeg;base64," + res?.data;
                }
            }
        }
    }

    // load file video kyc
    async loadFileVkyc() {
        // console.log(">>>Check video_kyc:", this.data.video_kyc.video_url);
        this.loadVkyc = true;
        if (this.data.video_kyc && this.data.video_kyc.video_url) {
            let res = await getImageS3(this.data.video_kyc.video_url);
            if (res && res?.status === 200) {
                this.loadVkyc = false;
                let decode_url = atob(res?.data);
                this.recordVideo = decode_url.split('|')[1];
            }
        }
    }
}
