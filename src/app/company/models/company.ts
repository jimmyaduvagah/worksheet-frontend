import { BaseModel } from '../../bases/models/BaseModel';

export class Company extends BaseModel {

    public name: string;
    public phone_number: string;
    public address_line_1: string;
    public address_line_2: string;
    public address_line_3: string;
    public address_line_4: string;
    public address_city: string;
    public address_state: string;
    public address_zip: string;
    public address_country: string;
    public main_contact: number;

    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }
}
