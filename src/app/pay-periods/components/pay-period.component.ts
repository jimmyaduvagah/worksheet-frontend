import { Component, ViewChild, EventEmitter } from '@angular/core';
import { PayPeriodService } from '../services/pay-period.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayPeriod, PAY_PERIOD_STATUS_CHOICE } from '../models/pay-period';
import { JobService } from '../../jobs/services/job.service';
import { Job } from '../../jobs/models/job';
import { SessionService } from '../../services/SessionService';
import { User } from '../../User/models/user';
import { OnAuthenticated, AuthenticatedComponent } from '../../bases/components/authenticated.component';
import { TOSAgreeComponent } from '../../directives/Bootstrap/modal/TOSAgreeComponent';
import { AlertComponent } from '../../directives/Bootstrap/modal/AlertComponent';

interface PayPeriodComponentRouterParams {
    payId: string;
}

@Component({
    selector: 'as-pay-period',
    templateUrl: 'app/pay-periods/templates/pay-period.html'
})

export class PayPeriodComponent extends AuthenticatedComponent implements OnAuthenticated {

    @ViewChild('TOSAgreeComponentModal')
    TOSAgreeComponentModal: TOSAgreeComponent;


    @ViewChild('AlertComponent')
    alertComponent: AlertComponent;

    public loading: boolean = true;
    public payPeriodId: number;
    public payPeriod: PayPeriod;
    public defaultHours: number;
    public totalExpectedHours: number = 0;
    public job: Job;
    public isMyJobOrAdmin: boolean = false;
    public isApprover: boolean = false;
    public reason: string;
    public alertText: string;
    public tosAction: string = '';
    public actionToDo: string = '';
    public willSubmit: EventEmitter<any> = new EventEmitter();

    public showReasonWithHoursNoCommentError: boolean = false;
    private plausibleHoursAlertForDate: string = '';


    constructor(public _payPeriodService: PayPeriodService,
                public _route: ActivatedRoute,
                public _router: Router,
                public _sessionService: SessionService,
                public _jobService: JobService) {
        super(_router, _sessionService);

    }

    public OnAuthenticated() {
        this.getPayPeriodId();
    }

    public getPayPeriodId() {
        this._route.params.subscribe((params: PayPeriodComponentRouterParams) => {
            this.payPeriodId = +params.payId;
            this.getPayPeriod();
        });

    }

    public getPayPeriod() {
        this._payPeriodService.get(this.payPeriodId, {full: 'true'}).subscribe((res) => {
            this.payPeriod = res;
            if (
                this.user.is_superuser ||
                this.user.userprofile.is_admin ||
                this.user.id === this.payPeriod.user_id
            ) {
                this.isMyJobOrAdmin = true;
            }
            if (
                this.user.is_superuser ||
                this.user.userprofile.is_admin ||
                this.payPeriod.job.isApprover(this.user.id)
            ) {
                this.isApprover = true;
            }

            this.job = this.payPeriod.job;
            this.defaultHours = this.job.work_day_hours;
            this.loading = false;
        });
    }

    public updateTotalExpectedHours(hours: number) {
        this.totalExpectedHours = hours;
    }

    public updateTotalHoursWorked(hours: number) {
        this.payPeriod.total_hours = hours;
    }

    public tosModalSaved(event) {
        // event will be false, or an objec that has the action and any TOS stuff like reason, iAgree, etc.
        if (event) {
            this._payPeriodService.action(this.payPeriod.id, event).subscribe((res) => {
                this.actionFieldUpdate(res);
            });
        }
    }


    public actionFieldUpdate(res) {
        let fields = ['status', 'modified_on', 'status_display', 'locked', 'is_submitted', 'is_approved'];
        for (let field of fields) {
            if (this.payPeriod.hasOwnProperty(field)) {
                this.payPeriod[field] = res[field];
            }
        }
    }

    public commentCheck() {
        this.willSubmit.emit(true);
        return false;
    }

    public workTimesCheckCallback(event) {
        if (event === true) {
            this.showReasonWithHoursNoCommentError = false;
            this.submitPayPeriod();
        } else {
            this.showReasonWithHoursNoCommentError = true;
            // do a popup here...
            this.alertText = 'There are errors below that need to be fixed before you can submit.';
            this.alertComponent.show = true;
        }
    }

    public rejectPayPeriod() {
        this.tosAction = 'Reject';
        this.actionToDo = 'reject';
        this.TOSAgreeComponentModal.showModal();
    }

    public submitPayPeriod() {
        this.tosAction = 'Submit';
        this.actionToDo = 'submit';
        // this._payPeriodService.action(this.payPeriod.id, {'do': 'submit'}).subscribe((res) => {
        //     this.actionFieldUpdate(res);
        // });
        this.TOSAgreeComponentModal.showModal();
    }

    public approvePayPeriod() {
        // this._payPeriodService.action(this.payPeriod.id, {'do': 'approve'}).subscribe((res) => {
        //     this.actionFieldUpdate(res);
        // });
        this.tosAction = 'Approve';
        this.actionToDo = 'approve';
        this.TOSAgreeComponentModal.showModal();
    }

    public togglePayPeriodLock() {
        if (this.user.userprofile.is_admin) {
            let lockAction = '';
            if (this.payPeriod.locked) {
                lockAction = 'unlock';
                this.payPeriod.locked = false;
            } else {
                lockAction = 'lock';
                this.payPeriod.locked = true;
            }

            this._payPeriodService.action(this.payPeriod.id, {'do': lockAction}).subscribe((res) => {
                this.actionFieldUpdate(res);
            });
        }

    }

    public unSubmitPayPeriod() {
        // this._payPeriodService.action(this.payPeriod.id, {'do': 'unsubmit', 'reason': this.reason}).subscribe((res) => {
        //     this.actionFieldUpdate(res);
        // });
        this.tosAction = 'Un-Submit';
        this.actionToDo = 'unsubmit';

        this.TOSAgreeComponentModal.showModal();
    }


}
