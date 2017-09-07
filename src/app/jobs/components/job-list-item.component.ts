import {Component, Input} from '@angular/core';
import {Job} from '../models/job';

@Component({
    selector: 'as-job-list-item',
    templateUrl: 'app/jobs/templates/job-list-item.html'
})

export class JobListItemComponent {

    @Input()
    public job: Job;

    constructor() {
        return;
    }

}
