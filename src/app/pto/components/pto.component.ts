import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/SessionService';
import { OnAuthenticated, AuthenticatedComponent } from '../../bases/components/authenticated.component';
import { PtoService } from '../services/pto.service';
import { Pto } from '../models/pto';

@Component({
    selector: 'as-pto',
    templateUrl: 'app/pto/templates/pto.html'
})

export class PtoComponent extends AuthenticatedComponent implements OnAuthenticated {


    public loading: boolean = true;
    public pto: Pto[] = [];

    constructor(
                public _route: ActivatedRoute,
                public _router: Router,
                public _sessionService: SessionService,
                public _ptoService: PtoService
    ) {
        super(_router, _sessionService);
    }

    public OnAuthenticated() {
        this.getPto();
    }

    public getPto() {
        this._ptoService.myMostRecent().subscribe((res) => {
            this.pto = res;
            this.loading = false;
        });
    }



}
