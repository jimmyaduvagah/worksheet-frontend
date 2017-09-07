import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'as-modal-confirm',
    template: `    
    <div class="modal fade" [class.in]="show" [style.display]="show?'block':'none'" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header" *ngIf="head != ''">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">{{ head }}</h4>
          </div>
          <div class="modal-body">
            <p>{{ body }}</p>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-link modal-action" (click)="confirmNo($event)" data-dismiss="modal">Cancel</button>
             <button type="button" class="btn-link modal-action" (click)="confirmYes($event)">
                <strong>Confirm</strong>
                </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" [class.in]="show" [style.display]="show?'block':'none'" ></div>
    `
})

export class ConfirmComponent implements OnInit {

    @Input() show: boolean;
    @Input() head: string = '';
    @Input() body: string = '';
    @Output() confirm: EventEmitter<any> = new EventEmitter();
    @Output() showChange: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        if (this.head === '') {
            this.head = 'Confirmation';
        }

    }

    hide() {
        this.show = false;
        this.showChange.emit(false);
    }
    confirmYes() {
        this.confirm.emit(true);
        this.hide();
    }

    confirmNo() {
        this.confirm.emit(false);
        this.hide();
    }

}
