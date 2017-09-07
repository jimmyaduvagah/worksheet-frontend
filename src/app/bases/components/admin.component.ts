
import { SessionService } from '../../services/SessionService';
import { AuthenticatedComponent, OnAuthenticated } from './authenticated.component';
import { Router } from '@angular/router';


export declare abstract class OnAdminAuthenticated {
    abstract OnAdminAuthenticated(): void;
}

export class AdminComponent extends AuthenticatedComponent implements OnAuthenticated, OnAdminAuthenticated {

    public isAuthenticated: boolean = false;

    constructor(
        public _router: Router,
        public _sessionService: SessionService
    ) {
        super(_router, _sessionService);
        return;
        //
    }

    OnAuthenticated() {
        if (this._sessionService.user.userprofile.is_admin) {
            this.OnAdminAuthenticated();
        } else {
            this._router.navigate(['/']);
        }
    }

    OnAdminAuthenticated() {
        //
    }


}
