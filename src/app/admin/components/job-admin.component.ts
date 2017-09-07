import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {ListResponse} from '../../bases/models/ListResponse';
import {User} from '../../User/models/user';
import {UserService} from '../../User/services/user.service';
import {Job} from '../../jobs/models/job';
import {JobService} from '../../jobs/services/job.service';
import {Company} from '../../company/models/company';
import {CompanyService} from '../../company/services/company.service';
import {PayPeriodService} from '../../pay-periods/services/pay-period.service';
import {PayPeriodType} from '../../pay-periods/models/pay-period-type';


interface UrlParams {
    id: string; // needs to be a number when used
}

@Component({
    selector: 'as-jobs-admin',
    templateUrl: 'app/admin/templates/job-admin.component.html',
    styleUrls: [
        'app/admin/styles/job-admin.component.css'
    ]
})

export class JobAdminComponent implements OnInit {

    public userListResponse: ListResponse;
    public companyListResponse: ListResponse;
    public payPeriodListResponse: ListResponse;
    public job: Job = new Job({});
    public usersArray: User[] = [];
    public userIsSelected: boolean = false;
    public selectedUser: User;
    public companyArray: Company[] = [];
    public selectedCompany: Company;
    public companyIsSelected: boolean = false;
    public selectedPayPeriodType: PayPeriodType;
    public payPeriodTypeIsSelected: boolean = false;
    public payPeriodTypeArray: PayPeriodType[] = [];
    private loading: boolean = true;
    private pay_type: string = '';
    // TOdO This is a temporary solution for job.pay_type. to be changed later
    private payTypeArray: any[] = [ { 'name': 'Hourly (8 hrs)', 'id':  4 } ,
                                    { 'name': 'Hourly (10 hrs)', 'id':  3 },
                                    { 'name': 'Yearly', 'id':  2 },
                                    { 'name': 'Daily', 'id':  1 } ];
    private payPeriodTypeValue: string;
    private breadCrumbJobTitle: string;

    constructor(
        private _userService: UserService,
        private _companyService: CompanyService,
        private _jobService: JobService,
        private _payPayPeriodType: PayPeriodService,
        private _router: Router,
        private _route: ActivatedRoute
           ) {
       return;
    }

      ngOnInit() {
       this.getJobID();
    }

     public getJobID() {
        this.loading = true;
        this._route.params.subscribe( (params: UrlParams) => {
            if (params.hasOwnProperty('id')) {
                this.getJob(+params.id);
                this.getPayPeriodTypes();
                this.loading = false;
                this.breadCrumbJobTitle = 'Edit JOB';
            } else {
                this.getUsers();
                this.getCompanies();
                this.getPayPeriodTypes();
                this.loading = false;
                this.breadCrumbJobTitle = 'New JOB';
            }
        });
    }

    getJob(jobId: number) {
        this._jobService.get(jobId, { full: 'true' }).subscribe((res) => {
            this.job = res;
            console.log(this.job);
            this.job.user = res.user;
            this.job.company = res.company;
            this.job.employment_type = res.employment_type;
            this.companyIsSelected = true;
            this.userIsSelected = true;
            this.getPayPeriodTypes();
        });
    }

    getUsers() {
        this._userService.getList().subscribe((res) => {
            this.userListResponse = res;
            for (let i in this.userListResponse.results) {
                 if (this.userListResponse.results.hasOwnProperty(i)) {
                    this.usersArray.push(this.userListResponse.results[i]);
                 }
            }
        });
    }

   onSelectUser(user: User): void {
       this.selectedUser = user;
       this.userIsSelected = true;
       this.job.user = this.selectedUser;
       this.job.user_id = this.selectedUser.pk;
   }

   getCompanies() {
    this._companyService.getList().subscribe((res) => {
        this.companyListResponse = res;
        this.loading = false;
        for (let i in this.companyListResponse.results) {
            if (this.companyListResponse.results.hasOwnProperty(i)) {
                this.companyArray.push(this.companyListResponse.results[i]);
            }
        }
        });
    }

   onSelectCompany(company: Company): void {
       this.selectedCompany = company;
       this.companyIsSelected = true;
       this.job.company = this.selectedCompany.name;
   }

   getPayPeriodTypes() {
       this._payPayPeriodType.getPayPeriodTypes().subscribe((res) => {
            this.payPeriodListResponse = res;
            for (let i in this.payPeriodListResponse.results) {
                 if (this.payPeriodListResponse.results.hasOwnProperty(i)) {
                    this.payPeriodTypeArray.push(this.payPeriodListResponse.results[i]);
                 }
            }
       });
   }

   doSave() {
       this.save(this.job);
   }

   save(job) {
       if (job.id) {
           this.job.pay_periods = [];  // ToDo Find out how this is to be handled
           this._jobService.put(job.id, job).subscribe((res) => {
               this.job = res;
               this._router.navigate(['/admin/jobs']);
            });
       } else {
           // TOdO the ifs in here are temporary solution for job.pay_type. to be changed later

           this.job.pay_type = this.getId(this.payTypeArray, this.pay_type);
           this.job.pay_period_type_id = this.getId(this.payPeriodTypeArray, this.job.pay_period_type as string);
           this.job.approvers = []; // ToDo Find out how this is to be handled  .
           this.job.pay_periods = [];
           this._jobService.post(job).subscribe((res) => {
                this.job = res;
                this._router.navigate(['/admin/jobs']);
            });
       }
   }

   getId(_array: any[], _name: string): number {
        let idToReturn: number;
        for ( let i in _array ) {
            if (_array[i].name === _name) {
                return idToReturn = _array[i].id;
            }
        }
   }

}
