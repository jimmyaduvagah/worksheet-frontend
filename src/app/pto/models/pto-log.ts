import {BaseModel} from '../../bases/models/BaseModel';
import {User} from '../../User/models/user';
import { Pto } from './pto';
import { Job } from '../../jobs/models/job';


export class PtoLog extends BaseModel {

    public user: User;
    public user_id: number;
    public pto: Pto;
    public pto_id: number;
    public job: Job;
    public job_id: number = 0;
    public days: number = 0;
    public month: number = 0;
    public year: number = 0;


    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (field === 'user' && typeof obj[field] !== 'number') {
                    this[field] = new User(obj[field]);
                } if (field === 'pto' && typeof obj[field] !== 'number') {
                    this[field] = new User(obj[field]);
                } if (field === 'job' && typeof obj[field] !== 'number') {
                    this[field] = new User(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }


}
