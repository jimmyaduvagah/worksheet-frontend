import { AuthService } from '../../Auth/services/auth.service';
import { CONSTANTS } from '../../shared/constant/index';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'as-navbar',
    templateUrl: 'app/shared/navbar/navbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
    @Input() brand: string;

    loginUrl: string = CONSTANTS.MAIN.APP.LOGIN_ROUTE;

    @Input()
    isAuthenticated: boolean = false;

    @Input()
    isAdmin: boolean = false;

    @Input()
    userDisplayName: string;

    constructor(
        private _authService: AuthService
    ) {
        return;
    }

    logout() {
        this._authService.logout().subscribe((res) => {
            //
        });
    }
}


