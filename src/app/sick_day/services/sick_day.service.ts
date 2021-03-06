import { Injectable } from '@angular/core';
import { BaseService } from '../../bases/services/BaseService';
import { Http, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { HttpSettingsService } from '../../services/HttpSettingsService';
import { ListResponse } from '../../bases/models/ListResponse';
import { Observable } from 'rxjs';
import { SickDay } from '../models/sick_day';

@Injectable()

export class SickDayService extends BaseService {

    public _basePath = 'sick_days/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new SickDay(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): SickDay {
        return new SickDay(res.json());
    }

    public myMostRecent(params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl() + 'my_most_recent' + '/', options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public getForYear(params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let yearParamField = 'year';
        if (!params.hasOwnProperty(yearParamField)) {
            params[yearParamField] = new Date().getFullYear();
        }
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl() + 'get_for_year' + '/', options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

}
