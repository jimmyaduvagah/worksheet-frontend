import {Injectable} from '@angular/core';
import { Http, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import {BaseService} from '../../bases/services/BaseService';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import { VacationSickdayReportItem } from '../models/vacation-sickday-report-item';
import { Observable } from 'rxjs';


@Injectable()

export class VacationAndSickdayService extends BaseService {

    public _basePath = 'work-times/vacation_and_sickday_report/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMapForItems(res: Response): VacationSickdayReportItem[] {
        let toReturn = <VacationSickdayReportItem[]>res.json();
        for (let num in toReturn) {
            if (toReturn.hasOwnProperty(num)) {
                toReturn[num] = new VacationSickdayReportItem(toReturn[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): VacationSickdayReportItem {
        return new VacationSickdayReportItem(res.json());
    }

    public getList(params?: Object): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl(), options)
            .map(res => {
                let toReturn = <any>this.listMapForItems(res);
                this.listObject = toReturn;
                this.listO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }


}
