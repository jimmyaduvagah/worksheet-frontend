import { Component, OnInit } from '@angular/core';
import { JobService } from '../../jobs/services/job.service';
import { Router } from '@angular/router';
import { ListResponse } from '../../bases/models/ListResponse';

@Component({
    selector: 'as-jobs',
    templateUrl: 'app/admin/templates/jobs-admin-list.component.html'
})

export class JobsAdminListComponent implements OnInit {

    public jobsResponse: ListResponse;
    public searchTerm: string = '';
    private loading: boolean = true;
    private orderField: string = 'start_date';
    private orderDir: number = 0;
    private offset: number = 0;

    constructor(private _jobService: JobService,
                private _router: Router) {
        return;
    }

    ngOnInit() {
        this.getJobs();
    }

    getOrdering() {
        let ordering = this.orderField;
        if (this.orderDir === 0) {
            ordering = '-' + ordering;
        }
        return ordering;
    }

    getJobs() {
        this.loading = true;
        let options = {
            ordering: this.getOrdering(),
            offset: this.offset
        };
        if (this.searchTerm.length > 0) {
            let searchParamName = 'search';
            options[searchParamName] = this.searchTerm;
        }
        this._jobService.getList(options).subscribe((res) => {
            this.jobsResponse = res;
            this.loading = false;
        });
    }

    setOrder(field) {
        this.offset = 0;
        if (this.orderField === field) {
            if (this.orderDir === 0) {
                this.orderDir = 1;
            } else {
                this.orderDir = 0;
            }
        }
        this.orderField = field;
        this.getJobs();
    }

    setSearchTerm($event) {
        this.offset = 0;
        this.searchTerm = $event.target.value;
    }

    setOffset($event) {
        this.offset = $event;
        this.getJobs();
    }
}
