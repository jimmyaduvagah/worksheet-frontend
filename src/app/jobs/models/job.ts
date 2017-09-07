import { BaseModel } from '../../bases/models/BaseModel';
import { User } from '../../User/models/user';
import { PayPeriodType } from '../../pay-periods/models/pay-period-type';
import { PayPeriod } from '../../pay-periods/models/pay-period';

export class Job extends BaseModel {

    public user: User;
    public user_id: number;
    public job_title: string;
    public approvers: User[] | number[];
    public description: string;
    public work_day_hours: number;
    public overtime_enabled: boolean;
    public pay_period_type: PayPeriodType;
    public pay_period_type_id: number;
    public employment_type: number;  // Todo: not implemented yet EmploymentStatus
    public pay_type: number; // Todo: not yet written PayType
    public start_date: Date;
    public end_date: Date;
    public is_ended: boolean;
    public email_approved_pay_periods_to: string;
    public company: string;
    public pay_periods: PayPeriod[];
    public company_id: number;


    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (field === 'user' && typeof obj[field].charAt === 'undefined') {
                    this[field] = new User(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

    isApprover(userId: number) {
        for (let id of this.approvers) {
            console.log('approvers' + id);
            if (id === userId) {
                return true;
            }
        }
        return false;
    }

}
