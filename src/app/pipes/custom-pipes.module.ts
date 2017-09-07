import { NgModule } from '@angular/core';
import { BooleanPipe } from './BooleanPipe/BooleanPipe';
import { HumanizePipe } from './humanize/humanize';

@NgModule({
    declarations: [
        BooleanPipe,
        HumanizePipe
    ],
    exports: [
        BooleanPipe,
        HumanizePipe
    ],
})

export class CustomPipesModule {
    //
}
