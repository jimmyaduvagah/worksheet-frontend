import {Injectable} from '@angular/core';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/Rx';
import {BaseService} from '../../bases/services/BaseService';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import { PayPeriodRange, PayPeriodReport } from '../models/payroll-payperiod';


@Injectable()

export class BillingReportService extends BaseService {

    public _basePath = 'pay-periods/billing_info/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new PayPeriodReport(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    payPeriodRangeListMap(res: Response): PayPeriodRange[] {
        let toReturn = <PayPeriodRange[]>res.json();
        return toReturn;
    }

    singleMap(res: Response): PayPeriodReport {
        return new PayPeriodReport(res.json());
    }

    public getEndDates(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl('pay-periods/pay_period_end_dates/'), options)
            .map(res => {
                let toReturn = this.payPeriodRangeListMap(res);
                return toReturn;
            })
            .catch(this.handleError);
    }


}
