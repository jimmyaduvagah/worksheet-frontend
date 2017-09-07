import { Component } from '@angular/core';
import { State } from '../models/location';
import { LocationService } from '../services/location.service';

@Component({
    selector: 'as-job',
    templateUrl: 'app/company/templates/job.html'
})

export class StateComponent   {

    public state: State;
    private loading: boolean = true;

    constructor( _locationService: LocationService
                      )  {
        alert('sexy');
    }
}
