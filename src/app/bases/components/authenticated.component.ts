
import { SessionService } from '../../services/SessionService';
import { Router } from '@angular/router';
import { User } from '../../User/models/user';


export declare abstract class OnAuthenticated {
    abstract OnAuthenticated(): void;
}

export class AuthenticatedComponent implements OnAuthenticated {

    public isAuthenticated: boolean = false;
    public user: User;

    constructor(
        public _router: Router,
        public _sessionService: SessionService
    ) {
        this.start();
        return;
        //
    }

    OnAuthenticated() {
        //
    }

    start() {
        let sub;
        setTimeout(() => {
            if (typeof this._sessionService.user !== 'undefined' && this._sessionService.user !== null) {
                this.user = this._sessionService.user;
                this.isAuthenticated = this._sessionService.isLoggedIn();
                this.OnAuthenticated();
            } else {
                sub = this._sessionService.userObservable.subscribe((res) => {
                    this.user = res;
                    this.OnAuthenticated();
                    this.isAuthenticated = this._sessionService.isLoggedIn();
                    sub.unsubscribe();
                    sub = null;
                });
            }
        }, 1);
    }

}
