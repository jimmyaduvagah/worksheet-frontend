import {Injectable} from '@angular/core';
import {BaseService} from '../../bases/services/BaseService';
import {Http, Response} from '@angular/http';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import {WorkTime} from '../models/work-time';

@Injectable()

export class WorkTimeService extends BaseService {

    public _basePath = 'work-times/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new WorkTime(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): WorkTime {
        return new WorkTime(res.json());
    }

}
