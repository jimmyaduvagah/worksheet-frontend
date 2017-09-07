import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticDirective } from './ElasticDirective';

@NgModule({
    declarations: [
        ElasticDirective
    ],
    exports: [
        ElasticDirective
    ],
    imports: [
        CommonModule
    ]
})
export class ElasticModule {

}
