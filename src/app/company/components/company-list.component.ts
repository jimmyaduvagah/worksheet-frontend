import {Component, OnInit} from '@angular/core';
import {ListResponse} from '../../bases/models/ListResponse';
import { AuthenticatedComponent, OnAuthenticated } from '../../bases/components/authenticated.component';
import { Router } from '@angular/router';

@Component({
    selector: 'as-companies',
})

export class CompanyListComponent {

    public companyListResponse: ListResponse;
    private loading: boolean = true;

    constructor(
    ) {
       alert('sexy');
    }

}
