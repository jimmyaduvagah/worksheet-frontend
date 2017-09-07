import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { SettingsService } from './SettingsService';
import { AuthToken } from './AuthToken';
import { Router } from '@angular/router';
import { User } from '../User/models/user';
import { MAIN } from '../shared/constant/main';

@Injectable()
export class SessionService {

    public authStatus: EventEmitter<any> = new EventEmitter();
    public user: User;
    public userObservable: EventEmitter<any> = new EventEmitter();

    private _basePath = 'api-token-auth/';
    private _apiVersion = '1';


    constructor(private _http: Http,
                private _settings: SettingsService,
                private _authToken: AuthToken,
                private _router: Router
    ) {
    }

    public getToken() {
        return this._authToken.getToken();
    }

    public logout() {
        let toReturn = this._authToken.clearToken();
        this.actionLoggedOut();
        return toReturn;
    }

    public actionLoggedIn() {
        this.authStatus.emit({
            'authenticated': this.isLoggedIn()
        });
        this._router.navigate([MAIN.APP.AFTER_LOGIN_ROUTE]);
    }

    public actionLoggedOut() {
        this.authStatus.emit({
            'authenticated': this.isLoggedIn()
        });
        this._router.navigate([MAIN.APP.AFTER_LOGOUT_ROUTE]);
    }

    public isLoggedIn(): boolean {
        if (this.getToken() != null) {
            return true;
        } else {
            return false;
        }
    }

    public setUser(user: User) {
        this.user = user;
        if (user !== null) {
            this.userObservable.emit(user);
        }
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        let toReturn;
        if (typeof error.json().non_field_errors !== 'undefined') {
            toReturn = Observable.throw(error.json().non_field_errors[0]);
        } else {
            toReturn = Observable.throw('Server error');
        }
        return toReturn;
    }
}
