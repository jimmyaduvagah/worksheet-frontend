import { Component, OnInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import {WorkTimeReasonService} from '../services/work-time-reason.service';
import {WorkTimeReason} from '../models/work-time-reason';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'as-work-time-reasons',
    templateUrl: 'app/work-times/templates/work-time-reasons.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WorkTimesReasonsComponent),
            multi: true
        }
    ]
})

export class WorkTimesReasonsComponent implements OnInit, ControlValueAccessor {

    public workTimeReasonList: WorkTimeReason[] = [];

    value: number;

    @Input()
    disabled: boolean = false;

    @Input()
    countryId: number = 0;

    @Output()
    change: EventEmitter<any> = new EventEmitter();

    propagateChange = (_: any) => {
        //
    };

    constructor(private _workTimeReasonService: WorkTimeReasonService) {
        //
    }

    public ngOnInit() {
        this.getWorkTimeReasons();
    }

    public getWorkTimeReasons() {
        this._workTimeReasonService.getList({
            country: this.countryId
        }).subscribe((res) => {
            this.workTimeReasonList = res;
        });
    }
    public setReason(reasonId) {
        if (reasonId !== null && reasonId !== 'null') {
            this.change.emit(reasonId);
            this.value = reasonId;
        } else {
            this.change.emit(null);
            this.value = null;
        }
        this.propagateChange(this.value);
    }

    writeValue(value: any) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
        //
    }

    updatedFromSelect($event) {
        this.setReason($event.target.value);
    }
}
