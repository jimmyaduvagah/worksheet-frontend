import {BaseModel} from '../../bases/models/BaseModel';
import {User} from '../../User/models/user';
import {WorkTimeReason} from './work-time-reason';


export const WorkTimeStatusChoices = {
    NS: 'Not Submitted',
    SU: 'Submitted',
    AC: 'Accepted',
    RE: 'Rejected'
};



export class WorkTime extends BaseModel {


    public user_id: number;
    public job_id: number;
    public pay_period_id: number;
    public dateObj: Date;
    public date: string;
    public hours: number;
    public absence_reason: WorkTimeReason;
    // TODO: should absense reason be a model all it's own too? and this be like a null | AbsenceReason
    public user_comment: string;
    public approver_comment: string;
    public absence_reason_id: number;
    public approved_by: User;
    public approved_on: Date;
    public is_approved: boolean;
    public is_submitted: boolean;
    public submitted_on: Date;

    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (
                    field === 'date'
                ) {
                    this[field] = obj[field];
                    // makes the date the actual date
                    this.dateObj = new Date(new Date(obj[field]).getTime() + (new Date().getTimezoneOffset() * 60000) + 60000);
                } else if (field === 'hours') {
                    this[field] = parseFloat(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

    getWeekNumber() {
        let onejan = new Date(this.dateObj.getFullYear(), 0, 1);
        let millisecsInDay = 86400000;
        return Math.ceil(
                (
                    (
                        (
                            this.dateObj.getTime() - onejan.getTime()
                        ) / millisecsInDay
                    ) + onejan.getDay() - 0
                ) / 7) - 1;
    }

    getDay() {
        return this.dateObj.getDay();
    }

}
