export class VacationSickdayReportItem {

    pay_type: string = '';
    first_name: string = '';
    last_name: string = '';
    user_id: number;
    job_id: number;
    vacation_days: number;
    country_name: string = '';
    employee_type: string = '';
    sick_days: number;

    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (
                    field === 'vacation_days' ||
                    field === 'sick_days'
                ) {
                    if (obj[field] === null) {
                        this[field] = 0;
                    } else {
                        this[field] = obj[field];
                    }
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

}
