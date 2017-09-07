import { Component } from '@angular/core';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
    selector: 'as-job',
    templateUrl: 'app/company/templates/job.html'
})

export class CompanyComponent   {

    public company: Company;
    private loading: boolean = true;

    constructor( _companyService: CompanyService
                      )  {
        alert('sexy');
    }
}
