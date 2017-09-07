import { BaseModel } from '../../bases/models/BaseModel';
import { User } from '../../User/models/user';
import { WorkTime } from '../../work-times/models/work-time';
import { PayPeriod } from '../../pay-periods/models/pay-period';
import { SickDay } from './sick_day';

export class SickDayUse extends BaseModel {

    public user: User;
    public user_id: number;
    public work_time: WorkTime;
    public work_time_id: number;
    public pay_period: PayPeriod;
    public pay_period_id: number;
    public sick_days: SickDay;
    public sick_days_id: number;
    public days: number = 0;
    public month: number = 0;
    public year: number = 0;

    constructor(obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (field === 'user' && typeof obj[field] !== 'number') {
                    this[field] = new User(obj[field]);
                } else if (field === 'sick_days' && typeof obj[field] !== 'number') {
                    this[field] = new SickDay(obj[field]);
                } else if (field === 'pay_period' && typeof obj[field] !== 'number') {
                    this[field] = new PayPeriod(obj[field]);
                } else if (field === 'work_time' && typeof obj[field] !== 'number') {
                    this[field] = new WorkTime(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

}
