import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../directives/Loading/loading.module';
import { FormsModule } from '@angular/forms';
import { BootstrapModule } from '../directives/Bootstrap/bootstrap.module';
import { PtoService } from './services/pto.service';
import { PtoComponent } from './components/pto.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        FormsModule,
        BootstrapModule
    ],
    exports: [
        PtoComponent
    ],
    declarations: [
        PtoComponent
    ],
    providers: [
        PtoService
    ]
})
export class PtoModule {
}
