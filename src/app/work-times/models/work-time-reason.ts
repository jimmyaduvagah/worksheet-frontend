import {BaseModel} from '../../bases/models/BaseModel';

export class WorkTimeReason extends BaseModel {

    public modified_on: Date;
    public created_on: Date;
    public modified_by: number; // represent the person by a number id i'm guessing
    public created_by: number; // same as mod_by reason for being a #
    public order: number;
    public name: string;
    public enabled: boolean;
    public disable_hour_input: boolean;
    public default_holiday_reason: boolean;
    public for_country: number; // same idea as mod_by but countries

    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }
}
