import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobComponent } from './components/job.component';
import { JobListItemComponent } from './components/job-list-item.component';
import { JobService } from './services/job.service';
import { LoadingModule } from '../directives/Loading/loading.module';
import { FormsModule } from '@angular/forms';
import { JobsComponent } from './components/jobs.component';

@NgModule({
    declarations: [
        JobComponent,
        JobsComponent,
        JobListItemComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        FormsModule
    ],
    exports: [
        JobComponent,
        JobsComponent,
        JobListItemComponent
    ],
    providers: [
        JobService
    ]
})
export class JobsModule {
}
