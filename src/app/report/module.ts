import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PayrollReportComponent } from './components/payroll-report.component';
import { PayrollReportService } from './services/payroll-report.service';
import { LoadingModule } from '../directives/Loading/loading.module';
import { BillingReportService } from './services/billing-report.service';
import { VacationAndSickdayService } from './services/vacation-and-sickday.service';
import { VacationSickdayComponent } from './components/vacation-sickday-report.component';

@NgModule({
    declarations: [
        PayrollReportComponent,
        VacationSickdayComponent
        ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        FormsModule,
    ],
    exports: [
        PayrollReportComponent,
        VacationSickdayComponent
    ],
    providers: [
        PayrollReportService,
        BillingReportService,
        VacationAndSickdayService
    ]
})
export class ReportModule {
}
