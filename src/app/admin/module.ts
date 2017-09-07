import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './components/admin-dashboard.component';
import { JobsAdminListComponent } from './components/jobs-admin-list.component';
import { UserAdminListComponent } from './components/users-admin-list.component';
import { UserAdminComponent } from './components/user-admin.component';
import { JobAdminComponent } from './components/job-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportModule } from '../report/module';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2CompleterModule } from 'ng2-completer';
import { UserService } from './../User/services/user.service';
import { JobService } from './../jobs/services/job.service';
import { CompanyService } from './../company/services/company.service';
import { UserProfileService } from './../User/services/user-profile.service';
import { LocationService } from './../locations/services/location.service';
import { EmploymentTypePipe } from './pipes/employment_type.pipe';
import { LoadingModule } from '../directives/Loading/loading.module';
import { CustomPipesModule } from '../pipes/custom-pipes.module';
import { PaginationModule } from '../directives/Pagination/pagination.module';

@NgModule({
    declarations: [
        AdminDashboardComponent,
        JobsAdminListComponent,
        JobAdminComponent,
        UserAdminComponent,
        UserAdminListComponent,
        EmploymentTypePipe,
    ],
    exports: [
        AdminDashboardComponent,
        JobsAdminListComponent,
        JobAdminComponent,
        UserAdminComponent,
        UserAdminListComponent,
        EmploymentTypePipe,
    ],
    providers: [
        UserService,
        JobService,
        UserProfileService,
        CompanyService,
        LocationService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReportModule,
        PaginationModule,
        LoadingModule,
        BrowserModule,
        Ng2CompleterModule,
        CustomPipesModule
    ]
})

export class AdminModule {
    //
    //
}
