import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './modal/ConfirmComponent';
import { WorkTimeCommentComponent } from './modal/WorkTimeCommentComponent';
import { TOSAgreeComponent } from './modal/TOSAgreeComponent';
import { AlertComponent } from './modal/AlertComponent';

@NgModule({
    declarations: [
        ConfirmComponent,
        WorkTimeCommentComponent,
        TOSAgreeComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ConfirmComponent,
        WorkTimeCommentComponent,
        TOSAgreeComponent,
        AlertComponent
    ],
    providers: [  ],
})
export class BootstrapModule {
}
