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
    public data: any;

    public listURLCustomerPage: any = {
        'detail': false,
        'card': false
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(params => {
            this.custDetail = JSON.parse(atob(params?.encodeCustomer));
            this.data = JSON.parse(atob(params?.dataTotal));
            console.log(">>>Check data:", this.data);
            this.handleReasonStatusforKYCInfor(this.custDetail);
        })
    }

    ngOnInit(): void {
        // this.getDetailCustomer(this.cifId);
    }

    // For header KYC Information >>>>> Start >>>>>> devquiphan
    handleReasonStatusforKYCInfor(custDetail:any){
        if(custDetail['customerInqRs']) {
            let customer_inqr = custDetail['customerInqRs'];
            // console.log("Check customerInqRs>>>",customer_inqr);
            let current_status = "";
            // console.log("Check PIDStatus>>>",customer_inqr['PIDStatus'] ? customer_inqr['PIDStatus'] : null);
            if(customer_inqr['PIDStatus']) {
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
                    } else if(sign_casa == 'fail'){
                    if (custDetail['reason_fail']) {
                        let reason_fail = custDetail['reason_fail'];
                        let reason_detail = 'FAIL OTP';
                        if (reason_fail) {
                            let split_reason = reason_fail.split('&')
                            if (split_reason[0] == 'failFace') {
                                reason_detail = 'FAIL FACE MATCHING';
                            }
                        }
                        current_status =  'KYC Success - Sign Casa is block ' + reason_detail
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
                        if(custDetail['uuid_pid']){
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

    // Set color for AML
    setColor(value:any){
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
    getNameforFinalRisk(value:any){
        if (value) {
            if (value == 'N/A') {
                return 'N/A';
            } else if (value == 'low') {
                return 'LOW RISK';
            } else if (value == 'high') {
                return 'HIGH RISK';
            } else if (value == 'typical_high') {
                return 'TYPICAL HIGH RISK';
            } else if (value == 'default_high') {
                return 'DEFAULT HIGH RISK';
            }
        }
        return "";
    }
    // get Name for Field of History Update
    getNameKeyofHisUpdate(key:any) {
        if (key == 'riskBlckLst') {
            return 'Black List Risk'
        } else if (key == 'riskPEP') {
            return 'PEP List Risk'
        } else if (key == 'finalRisk') {
            return 'Final Risk'
        } else {
            return 'Occupation Risk'
        }
    }
}
