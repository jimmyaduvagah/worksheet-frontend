import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PayPeriodService } from '../../pay-periods/services/pay-period.service';
import { WorkTime } from '../models/work-time';
import { WorkTimeReasonService } from '../services/work-time-reason.service';
import { OnAuthenticated, AuthenticatedComponent } from '../../bases/components/authenticated.component';
import { SessionService } from '../../services/SessionService';
import { Router } from '@angular/router';
import { PayPeriod } from '../../pay-periods/models/pay-period';

interface WorkTimeWeek {
    workTimes: WorkTime[];
    weekNumber: number;
    hours: number;
    expectedHours: number;
}

@Component({
    selector: 'as-work-time-list',
    templateUrl: 'app/work-times/templates/work-time-list.html'
})

export class WorkTimeListComponent extends AuthenticatedComponent implements OnAuthenticated, AfterViewInit {

    @Input()
    payPeriod: PayPeriod;

    @Input()
    isMyJob: boolean = false;

    @Input()
    iAmTheApprover: boolean = false;

    @Input()
    defaultHours: number;

    @Input()
    willSubmit: EventEmitter<any> = new EventEmitter();

    @Input()
    showOnlyDaysWithNoHours: boolean = false;

    @Output()
    totalExpectedHours: EventEmitter<any> = new EventEmitter();

    @Output()
    totalHoursWorked: EventEmitter<any> = new EventEmitter();

    @Output()
    worktimesChecked: EventEmitter<any> = new EventEmitter();

    public hoursWorked: number[] = []; // each spot will be the hours worked for a day

    public workTimes: WorkTime[];

    public paddingDays: number = 0;

    public weeks: WorkTimeWeek[] = [];

    private loading: boolean = true;

    constructor(
        private _payPeriodService: PayPeriodService,
        public _router: Router,
        public _sessionService: SessionService
    ) {
        super(_router, _sessionService);
    }

    OnAuthenticated() {
        this.getWorkTimes(this.payPeriod.id);
    }

    ngAfterViewInit() {
        this.willSubmit.subscribe((res) => {
            this.checkForCommentsOnWorkTimesWithReasonSelected();
        });
    }

    public setUpWorkWeeks() {
        let lastWeekNumber = -1;
        let currentWeekNumber = -1;
        let totalExpectedHours = 0;
        for (let workTime of this.workTimes) {
            let weekNumber = workTime.getWeekNumber();
            if (weekNumber !== lastWeekNumber) {
                currentWeekNumber = this.weeks.push({
                    workTimes: [],
                    weekNumber: workTime.getWeekNumber(),
                    hours: 0,
                    expectedHours: 0
                });
            }
            this.weeks[currentWeekNumber - 1].workTimes.push(workTime);
            if (
                workTime.dateObj.getDay() !== 6 &&
                workTime.dateObj.getDay() !== 0 &&
                workTime.absence_reason_id === null
            ) {
                totalExpectedHours = totalExpectedHours + parseFloat(this.defaultHours.toString());
                this.weeks[currentWeekNumber - 1].expectedHours =
                    parseFloat(this.weeks[currentWeekNumber - 1].expectedHours.toString()) +
                    parseFloat(this.defaultHours.toString());
            }
            lastWeekNumber = weekNumber;
        }
        // emits back to parent controller the total expected hours for the week
        this.totalExpectedHours.emit(totalExpectedHours);

        if (this.weeks[0].workTimes[0].getDay() > 1) {
            this.paddingDays = 7 - (7 - this.weeks[0].workTimes[0].getDay());
        }
    }

    public getWorkTimes(payPeriodId: number) {
        this._payPeriodService.getWorkTimes(payPeriodId).subscribe((res) => {
            this.workTimes = res;
            this.setUpWorkWeeks();
            this.loading = false;
        });
    }

    countWeekHours(week: WorkTimeWeek) {
        let total = 0;
        for (let workTime of week.workTimes) {
            total = parseFloat(total.toString()) + parseFloat(workTime.hours.toString());
        }
        return total;
    }

    countTotalPeriodExpectedHours() {
        let total = 0;
        for (let week of this.weeks) {
            total += this.countExpectedWeekHours(week);
        }
        return total;
    }

    countExpectedWeekHours(week: WorkTimeWeek) {
        let total = 0;
        for (let workTime of week.workTimes) {
            if (
                workTime.dateObj.getDay() !== 6 &&
                workTime.dateObj.getDay() !== 0 &&
                workTime.absence_reason_id === null
            ) {
                total = parseFloat(total.toString()) + parseFloat(this.defaultHours.toString());
            }
        }
        week.expectedHours = total;
        return total;
    }

    totalHours() {
        let total = 0;
        for (let workTime of this.workTimes) {
            total = parseFloat(total.toString()) + parseFloat(workTime.hours.toString());
        }
        return total;
    }

    workTimeChanged($event) {
        this.totalExpectedHours.emit(this.countTotalPeriodExpectedHours());
        this.totalHoursWorked.emit(this.totalHours());
    }

    checkForCommentsOnWorkTimesWithReasonSelected() {
        let good = true;
        for (let wtweek of this.weeks) {
            for (let wt of wtweek.workTimes) {
                if (
                    wt.absence_reason_id !== null &&
                    wt.user_comment.length === 0 &&
                    wt.hours > 0
                ) {
                    console.log(wt);
                    good = false;
                }
            }
        }
        this.worktimesChecked.emit(good);
    }
}
