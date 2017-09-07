import {Injectable} from '@angular/core';
import {BaseService} from '../../bases/services/BaseService';
import { Http, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import {WorkTime} from '../models/work-time';
import {WorkTimeReason} from '../models/work-time-reason';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/from';

let mockData = [{
    'id': 12,
    'modified_on': '2015-09-04T18:24:52.970Z',
    'created_on': '2015-09-04T18:23:52.768Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 0,
    'name': 'NYSE Holiday',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': true,
    'for_country': 1
}, {
    'id': 13,
    'modified_on': '2015-09-04T18:24:52.975Z',
    'created_on': '2015-09-04T18:23:58.934Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 1,
    'name': 'Vacation',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}, {
    'id': 14,
    'modified_on': '2015-09-04T18:24:06.982Z',
    'created_on': '2015-09-04T18:24:06.982Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 2,
    'name': 'Sick Day',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}, {
    'id': 15,
    'modified_on': '2015-09-04T18:24:12.357Z',
    'created_on': '2015-09-04T18:24:12.357Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 3,
    'name': 'Maternity',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}, {
    'id': 16,
    'modified_on': '2015-09-04T18:24:17.817Z',
    'created_on': '2015-09-04T18:24:17.816Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 4,
    'name': 'Paternity',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}, {
    'id': 17,
    'modified_on': '2015-09-04T18:24:24.864Z',
    'created_on': '2015-09-04T18:24:24.864Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 5,
    'name': 'MTA',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}, {
    'id': 18,
    'modified_on': '2015-09-04T18:24:30.029Z',
    'created_on': '2015-09-04T18:24:30.029Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 6,
    'name': 'Training',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}, {
    'id': 19,
    'modified_on': '2015-09-04T18:24:35.912Z',
    'created_on': '2015-09-04T18:24:35.912Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 7,
    'name': 'Jury Duty',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}, {
    'id': 20,
    'modified_on': '2015-09-04T18:24:41.520Z',
    'created_on': '2015-09-04T18:24:41.520Z',
    'modified_by': 1,
    'created_by': 1,
    'order': 8,
    'name': 'Bereavement',
    'enabled': true,
    'disable_hour_input': true,
    'default_holiday_reason': false,
    'for_country': 1
}
];



@Injectable()

export class WorkTimeReasonMockService extends BaseService {

    public _basePath = 'work-time-reasons/';
    listObject = mockData;

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
        if (typeof this.listObject !== 'undefined') {
            return Observable.from([this.listObject]);
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
