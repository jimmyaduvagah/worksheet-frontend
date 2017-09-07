import {Job} from '../../jobs/models/job';
import {BaseModel} from '../../bases/models/BaseModel';
import {User} from '../../User/models/user';

export interface PayPeriodStatusInterface {
    NS: string;
    SU: string;
    AC: string;
    RE: string;
};

export const PAY_PERIOD_STATUS_CHOICE: PayPeriodStatusInterface = {
    NS: 'Not Submitted',
    SU: 'Submitted',
    AC: 'Approved',
    RE: 'Rejected'
};

export class PayPeriod extends BaseModel {

    public start_dateObj: Date;
    public end_dateObj: Date;
    public start_date: string;
    public end_date: string;
    public is_approved: boolean;
    public is_submitted: boolean;
    public submitted_on: Date;
    public job: Job;
    public user: User;
    public user_id: number;
    public total_hours: number = 0;
    public status: string;
    public status_display: string;
    public locked: boolean;

    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (
                    field === 'start_date' ||
                    field === 'end_date'
                ) {
                    // makes the date the actual date
                    this[field] = obj[field];
                    this[field + 'Obj'] = new Date(new Date(obj[field]).getTime() + (new Date().getTimezoneOffset() * 60000) + 60000);
                } else if (field === 'job') {
                    this[field] = new Job(obj[field]);
                } else if (field === 'user' && typeof obj[field] !== 'number') {
                    this[field] = new User(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

    getWeekNumber() {
        let onejan = new Date(this.start_dateObj.getFullYear(), 0, 1);
        let millisecsInDay = 86400000;
        return Math.ceil(
                (
                    (
                        (
                            this.start_dateObj.getTime() - onejan.getTime()
                        ) / millisecsInDay
                    ) + onejan.getDay() - 1
                ) / 7) - 1;
    }

    getStatus() {
        if (PAY_PERIOD_STATUS_CHOICE.hasOwnProperty(this.status)) {
            return PAY_PERIOD_STATUS_CHOICE[this.status];
        }
        return '';
    }

}
