import { Injectable } from '@angular/core';
import { BaseService } from '../../bases/services/BaseService';
import { Http, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { HttpSettingsService } from '../../services/HttpSettingsService';
import { ListResponse } from '../../bases/models/ListResponse';
import { PayPeriod } from '../models/pay-period';
import { PayPeriodType } from '../models/pay-period-type';
import { Observable } from 'rxjs/Rx';
import { WorkTime } from '../../work-times/models/work-time';

@Injectable()

export class PayPeriodService extends BaseService {

    public _basePath = 'pay-periods/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new PayPeriod(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    listMapNoPagination(res: Response): PayPeriod[] {
        let toReturn = <PayPeriod[]>res.json();
        for (let num in toReturn) {
            if (toReturn.hasOwnProperty(num)) {
                toReturn[num] = new PayPeriod(toReturn[num]);
            }
        }
        return toReturn;
    }

    listMapForWorkTime(res: Response): WorkTime[] {
        let toReturn = res.json();
        for (let num in toReturn) {
            if (toReturn.hasOwnProperty(num)) {
                toReturn[num] = new WorkTime(toReturn[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): PayPeriod {
        return new PayPeriod(res.json());
    }

    public getWorkTimes(payPeriodId: number, params?): Observable<any> {

        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl() + payPeriodId + '/work_times/', options)
            .map(res => {
                let toReturn = <any>this.listMapForWorkTime(res);
                return toReturn;
            })
            .catch(this.handleError);
    }

    payPeriodTypeListMap(res: Response): PayPeriodType[] {
        let toReturn = <PayPeriodType[]>res.json();
        return toReturn;
    }

    public getPayPeriodTypes(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl('pay-period-types/'), options)
            .map(res => {
                let toReturn = this.payPeriodTypeListMap(res);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public action(id, params): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders()
        };
        return this.http.post(this.getUrl() + id + '/action/?' + this.makeStringOfParams(params), '', options)
            .map(res => {
                let toReturn = <PayPeriod>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public getMyOpenPayPeriods(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl() + 'my_open/', options)
            .map(res => {
                let toReturn = <PayPeriod[]>this.listMapNoPagination(res);
                this.listObject = toReturn;
                this.listO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public getMyPendingPayPeriods(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl() + 'my_pending/', options)
            .map(res => {
                let toReturn = <PayPeriod[]>this.listMapNoPagination(res);
                this.listObject = toReturn;
                this.listO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public getPayPeriodsToApprove(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl() + 'my_approvals/', options)
            .map(res => {
                let toReturn = <PayPeriod[]>this.listMapNoPagination(res);
                this.listObject = toReturn;
                this.listO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public approveMultiplePayPeriods(ids = [], params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        let data = {
            ids: ids.join(',')
        };
        return this.http.post(this.getUrl() + 'approve_all_submitted/', JSON.stringify(data), options)
            .map(res => {
                let toReturn = <PayPeriod[]>this.listMapNoPagination(res);
                this.listObject = toReturn;
                this.listO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

}
