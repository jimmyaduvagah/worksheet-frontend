import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { ListResponse } from '../../bases/models/ListResponse';
import { SettingsService } from '../../services/SettingsService';
import { AuthenticatedComponent, OnAuthenticated } from '../../bases/components/authenticated.component';
import { Router } from '@angular/router';
import { SessionService } from '../../services/SessionService';

@Component({
    selector: 'as-jobs',
    templateUrl: 'app/jobs/templates/jobs.html'
})

export class JobsComponent extends AuthenticatedComponent implements OnAuthenticated {

    public jobsResponse: ListResponse;
    private loading: boolean = true;

    constructor(public _jobService: JobService,
                public _router: Router,
                public _settingsService: SettingsService,
                public _sessionService: SessionService
    ) {
        super(_router, _sessionService);
    }

    OnAuthenticated() {
        this.getJobs();
    }

    getJobs() {
        this.loading = true;
        this._jobService.getList({full: 'true'}).subscribe((res) => {
            this.jobsResponse = res;
            this.loading = false;
        });
    }

}
