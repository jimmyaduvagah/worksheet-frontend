import { Injectable } from '@angular/core';
import { BaseService } from '../../bases/services/BaseService';
import {Observable} from 'rxjs/Observable';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import { HttpSettingsService } from '../../services/HttpSettingsService';
import { ListResponse } from '../../bases/models/ListResponse';
import { User } from '../models/user';
import { UserProfile } from '../models/user';
import { ContentType } from '@angular/http/src/enums';

@Injectable()

export class UserService extends BaseService {

    public _basePath = 'users/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new User(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): User {
        return new User(res.json());
    }

    singleUserProfileMap(res: Response): UserProfile {
        return new UserProfile(res.json());
    }

    public upDateUserProfile(id, data, params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        options.headers['Content-Type'] = 'text/plain';
        return this.http.put(this.getUrl('user-profile/') + id + '/', data, options)
            .map(res => {
                let toReturn = this.singleUserProfileMap(res);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public uploadProfileImage(id, data, params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.post(this.getUrl('user-profile/') + id  + '/' + 'upload_user_image_from_desktop' + '/', data, options)
            .map(res => {
                let toReturn = <any>(res);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public passwordReset(data, params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        console.log(options.headers);
        return this.http.post(this.getUrl('rest-auth/password/reset/'), data, options)
            .map(res => {
                let toReturn = <any>(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public passwordConfirm(data, params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        console.log(options.headers);
        return this.http.post(this.getUrl('rest-auth/password/reset/confirm/'), data, options)
            .map(res => {
                let toReturn = <any>(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public createUser(data, params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        console.log(options.headers);
        return this.http.post(this.getUrl('admin/users/'), data, options)
            .map(res => {
                let toReturn = this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public upDateUser(id, data, params?): Observable<any> {
        params = this._httpSettings.addTokenToParams(params);
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        console.log(options.headers);
        return this.http.put(this.getUrl('admin/users/') + id  + '/', data, options)
            .map(res => {
                let toReturn = this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }
}


