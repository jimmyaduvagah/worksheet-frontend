import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../directives/Loading/loading.module';
import { FormsModule } from '@angular/forms';
import { BootstrapModule } from '../directives/Bootstrap/bootstrap.module';
import { SickDayComponent } from './components/sick_day.component';
import { SickDayService } from './services/sick_day.service';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        FormsModule,
        BootstrapModule
    ],
    exports: [
        SickDayComponent
    ],
    declarations: [
        SickDayComponent
    ],
    providers: [
        SickDayService
    ]
})
export class SickDayModule {
}
