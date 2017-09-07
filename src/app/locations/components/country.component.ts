import { Component } from '@angular/core';
import { Country } from '../models/location';
import { LocationService } from '../services/location.service';

@Component({
    selector: 'as-job',
    templateUrl: 'app/company/templates/job.html'
})

export class CountryComponent   {

    public country: Country;
    private loading: boolean = true;

    constructor( _locationService: LocationService
                      )  {
        alert('good stuff');
    }
}

