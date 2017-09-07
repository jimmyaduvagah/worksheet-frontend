import { NgModule } from '@angular/core';
import { PROGRSS_BAR_DIRECTIVES } from './progress-bar';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PROGRSS_BAR_DIRECTIVES
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PROGRSS_BAR_DIRECTIVES
    ],
    providers: [  ],
})
export class ProgressBarModule {
}
