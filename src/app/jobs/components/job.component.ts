import {Component} from '@angular/core';
import {Job} from '../models/job';
import {JobService} from '../services/job.service';
import { ActivatedRoute} from '@angular/router';

interface JobComponentRouterParams {
    id: string; // needs to be a number when used
}

@Component({
    selector: 'as-job',
    templateUrl: 'app/jobs/templates/job.html'
})

export class JobComponent {

    public job: Job;
    private loading: boolean = true;

    constructor(
        private _jobService: JobService,
        private _route: ActivatedRoute
    ) {
        this.getJobID();
    }

    public getJobID() {
        this._route.params.subscribe( (params: JobComponentRouterParams) => {
            if (params.hasOwnProperty('id')) {
                this.getJob(+params.id);
            }
        });
    }

    getJob(jobId: number) {
        this.loading = true;
        this._jobService.get(jobId, {
            full: 'true'
        }).subscribe((res) => {
            this.job = res;
            this.loading = false;
        });
    }

}
