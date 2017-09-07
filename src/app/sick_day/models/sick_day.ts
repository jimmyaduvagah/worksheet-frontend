import { BaseModel } from '../../bases/models/BaseModel';
import { User } from '../../User/models/user';
import { SickDayUse } from './sick_day-use';

export class SickDay extends BaseModel {

    public user: User;
    public user_id: number;
    public days: number = 0;
    public hours: number = 0;
    public year: number = 0;
    public total_used: number = 0;
    public total_remaining: number = 0;
    public total_agreed: number = 0;
    public sick_day_uses: SickDayUse[] = [];

    constructor(obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (field === 'user' && typeof obj[field] !== 'number') {
                    this[field] = new User(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

}
