import {Component, OnInit} from '@angular/core';
import {ListResponse} from '../../bases/models/ListResponse';
import { PayrollReportService } from '../services/payroll-report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayPeriodRange } from '../models/payroll-payperiod';
import { BillingReportService } from '../services/billing-report.service';
import { AdminComponent, OnAdminAuthenticated } from '../../bases/components/admin.component';
import { SessionService } from '../../services/SessionService';

interface PeriodRange {
    start_date?: string;
    end_date?: string;
}

interface PayPeriodQuery {
    year?: number;
    month?: number;
}

interface ReportFilters {
    status?: string;
}

@Component({
    selector: 'as-payroll-report',
    templateUrl: 'app/report/templates/payroll-report.html',
    styleUrls: [
        'app/report/styles/payroll-report.css'
    ]
})

export class PayrollReportComponent extends AdminComponent implements OnInit, OnAdminAuthenticated {

    public payrollListResponse: ListResponse;
    public payperiodListResponse: PayPeriodRange[];
    public selectedPeriod: PayPeriodRange;
    public selectedPeriodIndex: number = 0;
    public year: number;
    public month: number;
    public reportType: string = 'payroll';
    public loadingRanges: boolean = true;
    public loadingPayPeriods: boolean = false;

    public reportFilters: ReportFilters = {};


    constructor(
        public _router: Router,
        public _sessionService: SessionService,
        private _payrollReportService: PayrollReportService,
        private _billingReportService: BillingReportService
    ) {
        super(_router, _sessionService);
    }

    OnAdminAuthenticated() {
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        this.getPayPeriodRanges();
    }

    ngOnInit() {
        document.title = 'Reports';
    }

    rangeSelected($event) {
        this.selectedPeriod = this.payperiodListResponse[$event.target.value];
    }

    getPayPeriodRanges() {
        console.log(this.year, this.month);
        let options: PayPeriodQuery = {};
        if (+this.year > 0) {
            options.year = this.year;
        }
        if (+this.month > 0) {
            options.month = this.month;
        }
        this._payrollReportService.getEndDates(options).subscribe((res) => {
            this.payperiodListResponse = res;
            console.log(res);
            this.loadingRanges = false;
            if (this.payperiodListResponse.length > 0) {
                this.selectedPeriodIndex = 0;
                this.selectedPeriod = this.payperiodListResponse[this.selectedPeriodIndex];
            } else {
                this.selectedPeriod = null;
                this.selectedPeriodIndex = null;
            }
        });
    }


    getPayrollPayPeriod() {
        let options: PeriodRange = {};
        if (this.selectedPeriod) {
            options.end_date = this.selectedPeriod.end_date;
            options.start_date = this.selectedPeriod.start_date;
            this.loadingPayPeriods = true;
        } else {
            console.error('no range selected');
        }
        if (this.reportType === 'payroll') {
            this._payrollReportService.getList(options).subscribe((res) => {
                this.payrollListResponse = res;
                this.loadingPayPeriods = false;
            });
        }
        if (this.reportType === 'billing') {
            this._billingReportService.getList(options).subscribe((res) => {
                this.payrollListResponse = res;
                this.loadingPayPeriods = false;
            });
        }
    }

}






