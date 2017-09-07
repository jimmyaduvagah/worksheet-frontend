import { NgModule } from '@angular/core';
import { PayPeriodListComponent } from './components/pay-period-list.component';
import { PayPeriodListItemComponent } from './components/pay-period-list-item.component';
import { PayPeriodService } from './services/pay-period.service';
import { JobService } from '../jobs/services/job.service';
import { PayPeriodComponent } from './components/pay-period.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../directives/Loading/loading.module';
import { FormsModule } from '@angular/forms';
import { WorkTimesModule } from '../work-times/module';
import { BootstrapModule } from '../directives/Bootstrap/bootstrap.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        FormsModule,
        WorkTimesModule,
        BootstrapModule
    ],
    exports: [
        PayPeriodComponent,
        PayPeriodListComponent,
        PayPeriodListItemComponent
    ],
    declarations: [
        PayPeriodComponent,
        PayPeriodListComponent,
        PayPeriodListItemComponent
    ],
    providers: [
        PayPeriodService,
        JobService
    ]
})
export class PayPeriodsModule {
}
