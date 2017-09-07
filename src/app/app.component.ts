import {Component, ApplicationRef} from '@angular/core';

import { CONSTANTS } from './shared';
import { SessionService } from './services/SessionService';
import { Router, ActivatedRoute, UrlSegment, NavigationStart } from '@angular/router';
import { User } from './User/models/user';
import { WorkTimeReasonService } from './work-times/services/work-time-reason.service';
import { UserService } from './User/services/user.service';

@Component({
    selector: 'as-main-app',
    templateUrl: 'app/app.html'
})
export class AppComponent {

    public user: User;
    public appBrand: string;
    public isAuthenticated: boolean = false;
    public userDisplayName: string;
    public isAdmin: boolean = false;

    constructor(
        private _sessionService: SessionService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _applicationRef: ApplicationRef,
        private _workTimeReasonService: WorkTimeReasonService,
        private _userService: UserService
    ) {
        this.isAuthenticated = this._sessionService.isLoggedIn();
        if (this.isAuthenticated) {
            this.getWorkTimeReasons();
            this.getUser();
        }
        this._sessionService.authStatus.subscribe((obj) => {
            this.isAuthenticated = this._sessionService.isLoggedIn();
            if (this.isAuthenticated) {
                this.getWorkTimeReasons();
                this.getUser();
            } else {
                this._sessionService.setUser(null);
                this.checkForAdmin(null);
            }
        });


        this.appBrand = CONSTANTS.MAIN.APP.BRAND;

        this._router.events.subscribe((nextValue: NavigationStart) => {

            if (nextValue.url !== '/auth/login' &&
                nextValue.url !== '/auth/register' &&
                nextValue.url !== '/auth/forgot-password' &&
                nextValue.url !== '/' &&
                !nextValue.url.match(/^\/auth\/forgot\-password\//)
            ) {
                if (!this.isAuthenticated) {
                    this._router.navigate(['/auth/login']);
                }
            }

            this._applicationRef.tick();
            setTimeout(() => {
                this._applicationRef.tick();
            }, 100);
            setTimeout(() => {
                this._applicationRef.tick();
            }, 300);
            setTimeout(() => {
                this._applicationRef.tick();
            }, 500);
            setTimeout(() => {
                this._applicationRef.tick();
            }, 700);
        });
    }

    getWorkTimeReasons() {
        this._workTimeReasonService.getList().subscribe((res) => {
            //
        });
    }

    getUser() {
        this._userService.get('current_user').subscribe((res) => {
            this._sessionService.setUser(res);
            this.checkForAdmin(res);
            this.userDisplayName = this._sessionService.user.getName();
        });
    }

    checkForAdmin(user: User) {
        if (user !== null) {
            if (user.is_superuser) {
                this.isAdmin = true;
            } else if (user.userprofile.is_admin) {
                this.isAdmin = true;
            }
        } else {
            this.isAdmin = false;
        }
    }
}
