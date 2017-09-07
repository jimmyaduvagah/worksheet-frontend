import { Component } from '@angular/core';
import { SessionService } from '../../services/SessionService';
import { OnAdminAuthenticated, AdminComponent } from '../../bases/components/admin.component';
import { Router } from '@angular/router';


@Component({
    selector: 'as-admin-dashboard',
    templateUrl: 'app/admin/templates/admin-dashboard.html',
})

export class AdminDashboardComponent extends AdminComponent implements OnAdminAuthenticated {

    constructor(
        public _router: Router,
        public _sessionService: SessionService
    ) {
        super(_router, _sessionService);
        //
    }

    OnAdminAuthenticated() {
        console.log('component admin authed');
    }

}
