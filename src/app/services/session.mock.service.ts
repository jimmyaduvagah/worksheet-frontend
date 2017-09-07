import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { SettingsService } from './SettingsService';
import { AuthToken } from './AuthToken';
import { Router } from '@angular/router';
import { User } from '../User/models/user';

let mockUser = new User({
    'pk': 5,
    'url': 'http://127.0.0.1:8000/api/v1/users/5/',
    'username': 'mark',
    'first_name': 'Mark',
    'last_name': 'Hatchell',
    'email': 'mhatchell@mac.com',
    'groups': [],
    'userprofile': {
        'id': 5,
        'is_approver': false,
        'user_id': 5,
        'company_id': null,
        'user_image': 'profile_images/11953109_1666964023518409_2328036141116152121_n-2.jpg',
        'is_admin': false,
        'phone_number': '',
        'address_line_1': '',
        'address_line_2': '',
        'address_line_3': '',
        'address_line_4': '',
        'address_city': '',
        'address_zip': '',
        'pto_per_year': 5,
        'sick_days_per_year': 5,
        'address_state': null,
        'address_country': 1
    }
});

@Injectable()
export class SessionMockService {

    public authStatus: EventEmitter<any> = new EventEmitter();
    public user: User = mockUser;
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
        this._router.navigate(['/']);
    }

    public actionLoggedOut() {
        this.authStatus.emit({
            'authenticated': this.isLoggedIn()
        });
        this._router.navigate(['/']);
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
