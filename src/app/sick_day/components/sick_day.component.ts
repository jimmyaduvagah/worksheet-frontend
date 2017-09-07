import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/SessionService';
import { OnAuthenticated, AuthenticatedComponent } from '../../bases/components/authenticated.component';
import { SickDay } from '../models/sick_day';
import { SickDayService } from '../services/sick_day.service';

@Component({
    selector: 'as-sick-day',
    templateUrl: 'app/sick_day/templates/sick_day.html'
})

export class SickDayComponent extends AuthenticatedComponent implements OnAuthenticated {


    public loading: boolean = true;
    public sick_day: SickDay;

    constructor(
                public _route: ActivatedRoute,
                public _router: Router,
                public _sessionService: SessionService,
                public _sickDayService: SickDayService
    ) {
        super(_router, _sessionService);
    }

    public OnAuthenticated() {
        this.getPto();
    }

    public getPto() {
        this._sickDayService.myMostRecent().subscribe((res) => {
            this.sick_day = res;
            this.loading = false;
        });
    }



}
