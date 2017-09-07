import { BaseModel } from '../../bases/models/BaseModel';
import { Country } from './country';

export class State extends BaseModel {

    public name: string;
    public abbreviation: string;
    public country: Country;

    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }
}
