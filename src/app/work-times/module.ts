import { WorkTimeComponent } from './components/work-time.component';
import { NgModule } from '@angular/core';
import { WorkTimeListComponent } from './components/work-time-list.component';
import { WorkTimesReasonsComponent } from './components/work-time-reasons.component';
import { WorkTimeService } from './services/work-time.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../directives/Loading/loading.module';
import { FormsModule } from '@angular/forms';
import { WorkTimeReasonService } from './services/work-time-reason.service';
import { HoursBarComponent } from './components/hours-bar.component';
import { ElasticModule } from '../directives/elastic/module';
import { BootstrapModule } from '../directives/Bootstrap/bootstrap.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        FormsModule,
        ElasticModule,
        BootstrapModule
    ],
    exports: [
        WorkTimeComponent,
        WorkTimeListComponent,
        WorkTimesReasonsComponent
    ],
    declarations: [
        WorkTimeComponent,
        WorkTimeListComponent,
        WorkTimesReasonsComponent,
        HoursBarComponent
    ],
    providers: [
        WorkTimeService,
        WorkTimeReasonService
    ]
})
export class WorkTimesModule {
}
