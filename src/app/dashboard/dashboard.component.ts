import { Component } from '@angular/core';
import { AuthenticatedComponent, OnAuthenticated } from '../bases/components/authenticated.component';
import { SessionService } from '../services/SessionService';
import { Router } from '@angular/router';
import { PayPeriodService } from '../pay-periods/services/pay-period.service';
import { PayPeriod } from '../pay-periods/models/pay-period';
import { PtoService } from '../pto/services/pto.service';
import { Pto } from '../pto/models/pto';
import { SickDayService } from '../sick_day/services/sick_day.service';
import { SickDay } from '../sick_day/models/sick_day';

@Component({
    selector: 'as-dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    styleUrls: [
        'app/dashboard/dashboard.css'
    ]
})
export class DashboardComponent extends AuthenticatedComponent implements OnAuthenticated {

    public myOpenPayPeriods: PayPeriod[] = [];
    public myOpenPayPeriodsLoading: boolean = true;

    public myPayPeriodsPendingApproval: PayPeriod[] = [];
    public myPayPeriodsPendingApprovalLoading: boolean = true;

    public myPayPeriodsToApprove: PayPeriod[] = [];
    public myPayPeriodsToApproveLoading: boolean = true;

    public pto: Pto;
    public ptoLoading: boolean = true;
    public ptoNonExistent: boolean = true;

    public sickDay: SickDay;
    public sickDayLoading: boolean = true;
    public sickDayNonExistent: boolean = true;

    public waitingForAuthentication: boolean = true;

    public selectedAllPayPeriods: boolean = false;
    public selectedPayPeriodsToApprove: boolean[] = [];

    public atLeastOneSelectedForApprovalBtn: boolean = false;


    constructor(
        public _router: Router,
        public _sessionService: SessionService,
        public _ptoService: PtoService,
        public _sickDayService: SickDayService,
        public _payPeriodService: PayPeriodService
    ) {
        super(_router, _sessionService);
    }

    OnAuthenticated() {
        this.waitingForAuthentication = false;
        this._payPeriodService.getMyOpenPayPeriods().subscribe((res) => {
            this.myOpenPayPeriods = res;
            this.myOpenPayPeriodsLoading = false;
        });
        this._payPeriodService.getMyPendingPayPeriods().subscribe((res) => {
            this.myPayPeriodsPendingApproval = res;
            this.myPayPeriodsPendingApprovalLoading = false;
        });
        this.getPayPeriodsToApprove();
        this.getPto();
        this.getSickDay();
    }

    public getPto() {
        this._ptoService.getForYear({
            full: true
        }).subscribe((res) => {
            this.pto = res;
            this.ptoLoading = false;
            this.ptoNonExistent = false;
        });
    }

    public getSickDay() {
        this._sickDayService.getForYear({
            full: true
        }).subscribe((res) => {
            this.sickDay = res;
            this.sickDayLoading = false;
            this.sickDayNonExistent = false;
        });
    }

    getPayPeriodsToApprove() {
        this.selectedPayPeriodsToApprove = [];
        this.myPayPeriodsToApproveLoading = true;
        this._payPeriodService.getPayPeriodsToApprove().subscribe((res) => {
            this.myPayPeriodsToApprove = res;
            for (let index in res) {
                if (res.hasOwnProperty(index)) {
                    this.selectedPayPeriodsToApprove[index] = false;
                }
            }
            this.myPayPeriodsToApproveLoading = false;
        });
    }

    toggleSelectAllPayPeriods() {
        this.selectedAllPayPeriods = !this.selectedAllPayPeriods;
        for (let index in this.selectedPayPeriodsToApprove) {
            if (this.selectedPayPeriodsToApprove.hasOwnProperty(index)) {
                if (this.selectedAllPayPeriods) {
                    this.selectedPayPeriodsToApprove[index] = true;
                } else {
                    this.selectedPayPeriodsToApprove[index] = false;
                }
            }
        }
        this.atLeastOneSelectedForApproval();
    }

    setToNotAllSelected() {
        this.selectedAllPayPeriods = false;
        setTimeout(() => {
            this.atLeastOneSelectedForApproval();
        }, 1);
    }

    approveSelected() {
        let ids: number[] = [];
        this.myPayPeriodsToApproveLoading = true;
        for (let index in this.selectedPayPeriodsToApprove) {
            if (this.selectedPayPeriodsToApprove.hasOwnProperty(index)) {
                if (this.selectedPayPeriodsToApprove[index] === true) {
                    ids.push(this.myPayPeriodsToApprove[index].id);
                }
            }
        }
        if (ids.length > 0) {
            this._payPeriodService.approveMultiplePayPeriods(ids).subscribe((res) => {
                console.log(res);
                this.getPayPeriodsToApprove();
            });
        }
    }

    atLeastOneSelectedForApproval() {
        let toReturn = false;
        for (let item of this.selectedPayPeriodsToApprove) {
            if (item === true) {
                toReturn = true;
            }
        }
        this.atLeastOneSelectedForApprovalBtn = toReturn;
        return false;
    }
}
