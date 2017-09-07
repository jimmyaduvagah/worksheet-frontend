import { Injectable } from '@angular/core';
import { BaseService } from '../../bases/services/BaseService';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import { HttpSettingsService } from '../../services/HttpSettingsService';
import { ListResponse } from '../../bases/models/ListResponse';
import { Country } from '../models/country';

@Injectable()

export class CountryService extends BaseService {

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


}


