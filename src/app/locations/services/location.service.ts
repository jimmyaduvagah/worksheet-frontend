import { Injectable } from '@angular/core';
import { BaseService } from '../../bases/services/BaseService';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptionsArgs, URLSearchParams, Headers } from '@angular/http';
import { HttpSettingsService } from '../../services/HttpSettingsService';
import { ListResponse } from '../../bases/models/ListResponse';
import { State } from '../models/location';
import { Country } from '../models/country';

@Injectable()

export class LocationService extends BaseService {

    public _basePath = 'countries/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new Country(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): Country {
        return new Country(res.json());
    }

    listMapState(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new State(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    public getStates(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        console.log(options.headers);
        return this.http.get(this.getUrl('states/'), options)
            .map(res => {
                let toReturn = this.listMapState(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

}

