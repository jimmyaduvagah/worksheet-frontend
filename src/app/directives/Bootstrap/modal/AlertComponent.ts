import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { WorkTime } from '../../../work-times/models/work-time';

@Component({
    selector: 'as-modal-alert',
    template: `    
    <div class="modal fade" [class.in]="show" [style.display]="show?'block':'none'" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" *ngIf="head != ''">
            <button 
                (click)="modalCancel($event)" 
                type="button" 
                class="close" 
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">{{ head }}</h4>
          </div>
          <div class="modal-body">
            {{ alertText }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-action" (click)="hide()" data-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" [class.in]="show" [style.display]="show?'block':'none'" ></div>
    `
})

export class AlertComponent implements OnInit {
    @Input() show: boolean;
    @Input() alertText: string;
    @Input() head: string = '';
    @Output() showChange: EventEmitter<any> = new EventEmitter();
    private body = document.getElementsByTagName('body')[0];

    ngOnInit() {
        if (this.head === '') {
            this.head = 'Alert';
        }
        this.initData();
    }

    initData() {
        // pass
    }

    showModal() {
        this.initData();

        this.body.classList.add('modal-open');
        this.show = true;
        this.showChange.emit(true);
    }

    hide() {
        this.show = false;
        this.body.classList.remove('modal-open');
        this.showChange.emit(false);
    }

}
