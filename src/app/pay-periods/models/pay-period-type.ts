import {BaseModel} from '../../bases/models/BaseModel';

export interface UnitChoicesInterface {
    DA: string;
    WE: string;
    MO: string;
}

export const UNIT_CHOICES: UnitChoicesInterface = {
    DA: 'days',
    WE: 'weeks',
    MO: 'months'
};

export class PayPeriodType extends BaseModel {
    public name: string;
    public unit: string;
    public length: number;
    public first_pay_period_date: Date;

    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }
}
