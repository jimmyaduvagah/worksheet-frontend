import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import { CONSTANTS } from '../../shared/constant/index';

interface UrlParams {
    uid: string;
    token: string;
}

@Component({
    selector: 'as-forgot-password',
    templateUrl: 'app/User/templates/confirm-password.component.html',
    styleUrls: [
        'app/User/styles/user.css'
    ]
})

export class ConfirmPasswordComponent {

    public password1: string;
    public password2: string;
    public user_uid: string;
    public user_token: string;
    public response: string;
    public errors: any = {};
    public loginUrl: string = CONSTANTS.MAIN.APP.LOGIN_ROUTE;
    public complete: boolean = false;
    private loading: boolean = true;


    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute
    ) {
      this.getToken();
    }

    public getToken() {
        this._route.params.subscribe( (params: UrlParams) => {
            if (params.hasOwnProperty('uid')) {
                this.user_uid = params.uid;
            }
            if (params.hasOwnProperty('token')) {
                this.user_token = params.token;
                // console.log(this.user_token);
            }
        });
    }

    confirmPassword() {
        this._userService.passwordConfirm ( { 'uid': this.user_uid, 'token': this.user_token, 'new_password1': this.password1,
         'new_password2': this.password2 } ).subscribe((res) => {
            this.response = res;
            this.complete = true;
        }, (errors) => {
            this.errors = errors;
        });
    }


}
