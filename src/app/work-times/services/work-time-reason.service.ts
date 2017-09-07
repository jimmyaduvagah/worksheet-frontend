import { Injectable } from '@angular/core';
import { BaseService } from '../../bases/services/BaseService';
import { Http, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { HttpSettingsService } from '../../services/HttpSettingsService';
import { ListResponse } from '../../bases/models/ListResponse';
import { WorkTime } from '../models/work-time';
import { WorkTimeReason } from '../models/work-time-reason';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/from';

@Injectable()

export class WorkTimeReasonService extends BaseService {

    public _basePath = 'work-time-reasons/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new WorkTimeReason(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): WorkTimeReason {
        return new WorkTimeReason(res.json());
    }

    public getList(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let countryParam = 'country';
        if (typeof this.listObject !== 'undefined') {
            if (params.hasOwnProperty(countryParam)) {
                return Observable.from([this.listObject.filter(i => i.for_country === params[countryParam])]);
            } else {
                return Observable.from([this.listObject]);
            }
        }
        if (!params.hasOwnProperty(countryParam)) {
            params[countryParam] = 0;
        }
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl(), options)
            .map(res => {
                let toReturn = <any>this.listMap(res);
                this.listObject = toReturn;
                this.listO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }
}
