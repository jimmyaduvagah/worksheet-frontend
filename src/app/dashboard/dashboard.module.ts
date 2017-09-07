import { NgModule } from '@angular/core';
import { DashboardComponent } from './index';
import { LoadingModule } from '../directives/Loading/loading.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PtoModule } from '../pto/module';
import { SickDayModule } from '../sick_day/module';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        LoadingModule,
        CommonModule,
        RouterModule,
        FormsModule,
        PtoModule,
        SickDayModule
    ]
})
export class DashboardModule {
}
