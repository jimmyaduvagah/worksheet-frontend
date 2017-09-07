import {Component, Input} from '@angular/core';

@Component({
    selector: 'as-progress-bar',
    template: `
        <div class="progress" style="width: 100%; position: relative;">
            <div class="progress-bar" style="position: relative;" role="progressbar" 
                [style.width]="(currentValue/maxValue) | percent: '.0-0'">
                {{ (currentValue/maxValue) | percent: '.0-0' }}
            </div>
        </div>
    `
})

export class ProgressBarComponent {
    @Input()
    public minValue: number = 0;

    @Input()
    public maxValue: number = 1;

    @Input()
    public currentValue: number = 0;

}
