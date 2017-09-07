import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

interface HoursBarChanges extends SimpleChanges {
    percent: SimpleChange;
}

@Component({
    selector: 'as-hours-bar',
    template: `
        <div class="hours-bar-container">
            <div 
            [style.width]="displayPercent | percent:'2.0-1'"
            [class.bg-danger-full]="percent > 1"
            [class.bg-success-full]="percent <= 1 && percent >= .5"
            [class.bg-warning-full]="percent < .5"
            ></div>
        </div>
    `
})

export class HoursBarComponent implements OnChanges {

    @Input()
    percent: number;

    displayPercent: number = 0;


    constructor() {
        //
    }

    ngOnChanges(changes: HoursBarChanges) {
        if (changes.hasOwnProperty('percent')) {
            if (changes.percent.hasOwnProperty('currentValue')) {
                if (changes.percent.currentValue > 1) {
                    this.displayPercent = 1;
                } else {
                    this.displayPercent = changes.percent.currentValue;
                }
            }
        }
    };

}
