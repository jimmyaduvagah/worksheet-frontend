import {
    Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges,
    SimpleChanges, SimpleChange, AfterViewInit, AfterContentChecked
} from '@angular/core';
import { WorkTime } from '../models/work-time';
import { WorkTimeReason } from '../models/work-time-reason';
import { WorkTimeService } from '../services/work-time.service';
import { SessionService } from '../../services/SessionService';
import { AuthenticatedComponent, OnAuthenticated } from '../../bases/components/authenticated.component';
import { Router } from '@angular/router';
import { WorkTimeCommentComponent } from '../../directives/Bootstrap/modal/WorkTimeCommentComponent';
import { PayPeriod } from '../../pay-periods/models/pay-period';

interface WorkTimeComponentSimpleChanges extends SimpleChanges {
    showOnlyDaysWithNoHours: SimpleChange;
}

@Component({
    /* tslint:disable */
    selector: '[as-work-time]',
    /* tslint:enable */
    templateUrl: 'app/work-times/templates/work-time.html'
})

export class WorkTimeComponent extends AuthenticatedComponent implements OnAuthenticated, OnChanges, AfterContentChecked {

    @Input()
    workTime: WorkTime;

    @Output()
    workTimeChange: EventEmitter<any> = new EventEmitter();

    @Output()
    workTimeUpdated: EventEmitter<any> = new EventEmitter();

    @Input()
    isMyJob: boolean = false;

    @Input()
    iAmTheApprover: boolean = false;

    @Input()
    defaultHours: number = 0;

    @Input()
    showOnlyDaysWithNoHours: boolean = false;

    @Input()
    payPeriod: PayPeriod;

    @ViewChild('panel')
    panel: ElementRef;

    @ViewChild('worktimeCommentModal')
    worktimeCommentModal: WorkTimeCommentComponent;

    public loading: boolean = false;
    private messageCount: number = 0;
    private error: any;
    private warningMsg: string;
    private errorMsg: string;

    private updateQueue: any = null;

    constructor(private _workTimeService: WorkTimeService,
                private _viewChild: ElementRef,
                public _router: Router,
                public _sessionService: SessionService) {
        super(_router, _sessionService);
        //
    }

    public ngAfterContentChecked() {
        this.checkForHoursAndReason();
        this.upateMessageCount();
    }

    OnAuthenticated() {
        //
    }

    ngOnChanges(changes: WorkTimeComponentSimpleChanges) {
        if (changes.hasOwnProperty('showOnlyDaysWithNoHours')) {
            if (changes.showOnlyDaysWithNoHours.currentValue === true) {
                if (this.workTime.hours > 0) {
                    this._viewChild.nativeElement.style.display = 'none';
                }
            } else {
                this._viewChild.nativeElement.style.display = '';
            }
        }
    }

    // this has been removed from the focus event on the input field, left method in case we want to use again.
    public setToDefaultHours() {
        let date = this.workTime.dateObj;
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            if (this.workTime.hours === 0) {
                this.workTime.hours = this.defaultHours;
                this.changed();
            }
        }
    }

    public highlightHours(e) {
        setTimeout(() => {
            e.target.select();
        }, 100);
    }

    public commentSaved(event) {
        if (event) {
            this.workTime = event;
            this.changed();
        }
    }

    public upateMessageCount() {
        this.messageCount = 0;
        if (this.workTime.user_comment) {
            this.messageCount += 1;
        }

        if (this.workTime.approver_comment) {
            this.messageCount += 1;
        }

    }

    public changed() {
        this.queueUpdate();
        this.upateMessageCount();
    }

    public queueUpdate() {
        if (!this.workTime.hours) {
            this.workTime.hours = 0;
        }

        this.workTimeChange.emit(this.workTime);
        this.workTimeUpdated.emit(this.workTime);

        if (this.updateQueue !== null) {
            clearTimeout(this.updateQueue);
            this.updateQueue = null;
        }

        if (this.updateQueue === null) {
            this.updateQueue = setTimeout(() => {
                this.save();
            }, 1500);
        }
    }

    public save() {
        this.loading = true;
        this._workTimeService.put(this.workTime.id, JSON.stringify(this.workTime)).subscribe((res) => {
            this.loading = false;
            this.checkForHoursAndReason();
            this.clearError();
            this.error = undefined;
        }, (error) => {
            this.error = error;
            this.loading = false;

            this.showError(error);
        });
    }

    public checkForHoursAndReason() {
        if (this.workTime.absence_reason_id !== null) {
            if (this.workTime.hours > 0 && (this.workTime.user_comment === null || this.workTime.user_comment === '') ) {
                this.clearWarning();
                this.showWarning('Add a comment explaining why you entered hours for today.');
            } else {
                this.clearWarning();
            }
        } else {
            this.clearWarning();
        }
    }

    private showError(error) {
        let errorMsg = '';
        if (typeof error.match !== 'undefined') {
            errorMsg = error;
        } else {
            for (let field in error) {
                if (error.hasOwnProperty(field)) {
                    errorMsg = errorMsg + field + ': ' + error[field];
                }
            }
        }
        this.errorMsg = errorMsg;
    }

    private clearError() {
        this.errorMsg = undefined;
    }

    private showWarning(warning) {
        let warningMsg = '';
        if (typeof warning.match !== 'undefined') {
            warningMsg = warning;
        } else {
            for (let field in warning) {
                if (warning.hasOwnProperty(field)) {
                    warningMsg = warningMsg + field + ': ' + warning[field] + ' ';
                }
            }
        }
        this.warningMsg = warningMsg;
    }

    private clearWarning() {
        this.warningMsg = undefined;
    }

}
