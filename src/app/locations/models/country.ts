
export class Country {

    public id: number;
    public name: string;
    public abbreviation: string;

    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }
}
