
import { PayPeriod } from '../../pay-periods/models/pay-period';
export class PayPeriodRange {

    start_date: string;
    end_date: string;


    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }
}


export class PayPeriodReport extends PayPeriod {

    days_worked: number = 0;

    constructor (obj: Object) {
        super(obj);
        let field = '';
        field = 'days_worked';
        if (obj.hasOwnProperty(field)) {
            this[field] = obj[field];
        }
    }
}
