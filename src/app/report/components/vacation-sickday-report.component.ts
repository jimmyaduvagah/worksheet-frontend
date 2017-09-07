import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { VacationAndSickdayService } from '../services/vacation-and-sickday.service';
import { VacationSickdayReportItem } from '../models/vacation-sickday-report-item';
import { OnAdminAuthenticated, AdminComponent } from '../../bases/components/admin.component';
import { SessionService } from '../../services/SessionService';

interface SearchObject {
    pay_type?: string;
    first_name?: string;
    last_name?: string;
    user_id?: string;
    job_id?: string;
    vacation_days?: string;
    country_name?: string;
    employee_type?: string;
    sick_days?: string;
}

@Component({
    selector: 'as-payroll-report',
    templateUrl: 'app/report/templates/vacation-sickday-report.html',
    styleUrls: [
        'app/report/styles/vacation-sickday-report.css'
    ]
})

export class VacationSickdayComponent extends AdminComponent implements OnInit, OnAdminAuthenticated {

    public reportList: VacationSickdayReportItem[];
    public originalReportList: VacationSickdayReportItem[];
    public year: number;
    public loading: boolean = true;
    public orderField: string = 'sick_days';
    public orderDir: number = 0;
    public searchObj: SearchObject = {};

    public yearList: number[] = [];

    constructor(
        public _router: Router,
        public _sessionService: SessionService,
        private _vacationAndSickdayService: VacationAndSickdayService
    ) {
        super(_router, _sessionService);
        this.year = new Date().getFullYear();
    }

    ngOnInit() {
        document.title = 'Vacation and Sickday Report';
        this.makeYearList();
    }

    makeYearList() {
        let max = new Date().getFullYear();
        let min = 2015;
        let i = min;
        while (i <= max) {
            this.yearList.push(i);
            i++;
        }
    }

    OnAdminAuthenticated() {
        this.getReport();
    }

    reportYearChanged() {
        setTimeout(() => {
            this.getReport();
        }, 1);
    }

    getReport() {
        this.loading = true;
        this._vacationAndSickdayService.getList({
            year: this.year
        }).subscribe((res) => {
            this.reportList = res;
            this.originalReportList = res;
            this.orderReport();
            this.search();
            this.loading = false;
        });
    }

    setOrder(field: string) {
        if (this.orderField === field) {
            this.orderDir = this.orderDir === 1 ? 0 : 1;
        } else {
            this.orderField = field;
        }
        this.orderReport();
        this.search();
    }

    orderReport() {
        let field = this.orderField;
        let direction = this.orderDir;
        this.loading = true;
        if (this.originalReportList.length > 0) {
            if (this.originalReportList[0].hasOwnProperty(field) ) {
                if (typeof this.originalReportList[0][field] === 'number') {
                    this.originalReportList.sort((a, b) => {
                        if (direction) {
                            return a[field] - b[field];
                        } else {
                            return b[field] - a[field];
                        }
                    });
                }
                if (typeof this.originalReportList[0][field] === 'string') {
                    this.originalReportList.sort((a, b) => {
                        let A = a[field].toUpperCase(); // ignore upper and lowercase
                        let B = b[field].toUpperCase(); // ignore upper and lowercase
                        if (direction) {
                            if (A < B) {
                                return -1;
                            }
                            if (A > B) {
                                return 1;
                            }
                        } else {
                            if (A > B) {
                                return -1;
                            }
                            if (A < B) {
                                return 1;
                            }
                        }

                        return 0;
                    });
                }
            }
        }
        this.loading = false;
    }

    shouldSearch() {
        let doSearch = false;
        for (let field in this.searchObj) {
            if (this.searchObj.hasOwnProperty(field)) {
                if (this.searchObj[field].length > 0) {
                    doSearch = true;
                } else {
                    delete this.searchObj[field];
                }
            }
        }
        return doSearch;
    }

    search() {
        if (this.shouldSearch()) {
            this.reportList = this.originalReportList.filter((item: VacationSickdayReportItem) => {
                let include = false;
                let matchesAll = [];
                for (let field in item) {
                    if (item.hasOwnProperty(field) && this.searchObj.hasOwnProperty(field)) {
                        if (item[field].toString().toUpperCase().match(this.searchObj[field].toUpperCase())) {
                            matchesAll.push(true);
                        } else {
                            matchesAll.push(false);
                        }
                    }
                }
                if (matchesAll.indexOf(false) < 0) {
                    include = true;
                }
                return include;
            });
        } else {
            this.reportList = this.originalReportList;
        }
   }
}






