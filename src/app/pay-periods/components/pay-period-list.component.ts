import {Component, OnInit} from '@angular/core';
import {PayPeriod} from '../models/pay-period';
import {PayPeriodService} from '../services/pay-period.service';
import {ListResponse} from '../../bases/models/ListResponse';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../../jobs/services/job.service';
import {Job} from '../../jobs/models/job';

interface PayPeriodsComponentRouterParams {
    jobId: string;
}

@Component({
    selector: 'as-pay-periods',
    templateUrl: 'app/pay-periods/templates/pay-period-list.html'
})

export class PayPeriodListComponent implements OnInit {

    public payPeriodIds: number[] = [];
    public jobId: number;
    public job: Job;
    public user: string;
    private payPeriodsResponse: ListResponse;
    private loading: boolean = true;

    constructor( private _payPeriodService: PayPeriodService,
                 private _route: ActivatedRoute,
                 private _jobService: JobService,
                 private _router: Router
    ) {
        this.getJobId();
    }

    public ngOnInit() {
        //
    }
    public getJobId() {
        this.loading = true;
        this._route.params.subscribe((params: PayPeriodsComponentRouterParams) => {
            this.jobId = parseInt(params.jobId, 10);
            this.getJob();
        });

    }
    public getJob() {
        this._jobService.get(this.jobId).subscribe((res) => {
            this.job = res;
            this.user = this.capitalizeFirstLetter(res.user);
            this.payPeriodIds = res.pay_periods;
            this.getPayPeriods();
        });
    }
    public getCompany(): string {
        return this.job.company;
    }

    public getJobTitle(): string {
        return this.job.job_title;
    }

    public getPayPeriods() {
        this._payPeriodService.getList({
            job: this.jobId
        }).subscribe( (res: ListResponse) => {
            console.log(res);
            this.payPeriodsResponse = res;
            this.loading = false;
        });
    }

    public capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public goToPayPeriod(payPeriodId: number) {
        this._router.navigate(['/pay-period/', payPeriodId, '/work_times/']);
    }
}
