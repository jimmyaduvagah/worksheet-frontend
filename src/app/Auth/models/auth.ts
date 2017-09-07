import {BaseModel} from '../../bases/models/BaseModel';

export class Auth extends BaseModel {


    // all of these are urls
    public users;
    public user_profiles;
    public user_profile;
    public groups;
    public work_times;
    public work_time_reasons;
    public jobs;
    public pay_periods;
    public pay_period_types;
    public projects;
    public companies;
    public countries;
    public states;
    public legal_texts;


   constructor (obj: Object) {
       super();
       for (let field in obj) {
           if (obj.hasOwnProperty(field)) {
               this[field] = obj[field];
           }
       }
   }
}
