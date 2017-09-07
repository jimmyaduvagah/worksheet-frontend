import { BaseModel } from '../../bases/models/BaseModel';
import { User } from '../../User/models/user';
import { SickDay } from './sick_day';
import { PayPeriod } from '../../pay-periods/models/pay-period';

export class PtoLog extends BaseModel {

    public user: User;
    public user_id: number;
    public sick_days: SickDay;
    public sick_days_id: number;
    public pay_period: PayPeriod;
    public pay_period_id: number = 0;
    public days: number = 0;
    public month: number = 0;
    public year: number = 0;

    constructor(obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (field === 'user' && typeof obj[field] !== 'number') {
                    this[field] = new User(obj[field]);
                }
                if (field === 'sick_days' && typeof obj[field] !== 'number') {
                    this[field] = new SickDay(obj[field]);
                }
                if (field === 'pay_period' && typeof obj[field] !== 'number') {
                    this[field] = new PayPeriod(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

}
