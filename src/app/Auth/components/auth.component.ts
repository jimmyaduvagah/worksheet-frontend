import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthToken } from '../../services/AuthToken';
import { Router } from '@angular/router';
import { SessionService } from '../../services/SessionService';

@Component({
    selector: 'as-auth',
    templateUrl: 'app/Auth/templates/auth.html',
    styleUrls: [
        'app/Auth/styles/auth.css'
    ]
})

export class AuthComponent {
    public password: string;
    public username: string;
    public errorMsg: string | void;
    public isAuthenticated: boolean = false;
    private loading: boolean = false;

    constructor(
        private _authService: AuthService,
        private _sessionService: SessionService,
        private _authToken: AuthToken,
        private _router: Router
    ) {
        let sub;
        if (typeof this._sessionService.user !== 'undefined') {
            this.isAuthenticated = this._sessionService.isLoggedIn();
            this.isLoggedIn();
        } else {
            sub = this._sessionService.userObservable.subscribe((res) => {
                this.isAuthenticated = this._sessionService.isLoggedIn();
                this.isLoggedIn();
                sub.unsubscribe();
                sub = null;
            });
        }
    };

    isLoggedIn() {
        if (this.isAuthenticated) {
            this._router.navigate(['/dashboard']);
        }
    }

    login() {
        this.loading = true;
        this.errorMsg = null;
        this._authService.login(JSON.stringify({'username': this.username, 'password': this.password}))
            .subscribe((res) => {
                    this.loading = false;
                },
                (errorMsg) => {
                    this.loading = false;
                    if (errorMsg.hasOwnProperty('non_field_errors')) {
                        this.errorMsg = errorMsg.non_field_errors;
                    }
                    this.password = '';
                }
            );
    }


}
