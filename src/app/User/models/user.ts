import {BaseModel} from '../../bases/models/BaseModel';

export class UserProfile {
    id: number;
    is_approver: boolean = false;
    user_id: number;
    company_id: number;
    user_image: string;
    is_admin: boolean = false;
    pto_per_year: number;
    sick_days_per_year: number;
    address_country: number;

    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }
}

export class User {

    id: number;
    pk: number;
    url: string;
    username: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
    email: string;
    groups: number[] = [];
    userprofile: UserProfile = new UserProfile({});

    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (field === 'userprofile') {
                    this[field] = new UserProfile(obj[field]);
                } else if (field === 'pk') {
                    this[field] = obj[field];
                    this.id = obj[field];
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

    getName() {
        if (
            typeof this.first_name === 'undefined' ||
            typeof this.last_name === 'undefined' ||
            typeof this.first_name === null ||
            typeof this.last_name === null
        ) {
            console.error('Please set the user\'s name for user id: ' + this.id);
            return this.username;
        } else {
            return this.first_name + ' ' + this.last_name;
        }
    }
}
