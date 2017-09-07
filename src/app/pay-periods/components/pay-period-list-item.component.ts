import {Component, Input} from '@angular/core';
import {PayPeriod} from '../models/pay-period';

@Component({
    selector: 'as-pay-period-list-item',
    templateUrl: 'app/pay-periods/templates/pay-period-list-item.html'
})

export class PayPeriodListItemComponent {

    @Input()
    public payPeriod: PayPeriod;

    constructor() {
        //
    }

}
