import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { WorkTime } from '../../../work-times/models/work-time';

@Component({
    selector: 'as-modal-worktime-comment',
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
            <p>User Comment</p>
            <textarea
                class="borderLess"
                [placeholder]="isMyJob?'Enter a comment':''"
                [(ngModel)]="workTimeCopy.user_comment"
                as-elastic
                rows="2"
                [disabled]="!isMyJob || locked"
            ></textarea>
            <p>Approver Comment</p>
            <textarea
                class="borderLess"
                [placeholder]="iAmTheApprover?'Enter a comment':''"
                [(ngModel)]="workTimeCopy.approver_comment"
                as-elastic
                rows="2"
                [disabled]="!iAmTheApprove || locked"
             ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-action" (click)="modalCancel($event)" data-dismiss="modal">Cancel</button>
             <button type="button" class="btn btn-primary modal-action" (click)="modalSave($event)">
                Save
                </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" [class.in]="show" [style.display]="show?'block':'none'" ></div>
    `
})

export class WorkTimeCommentComponent implements OnInit {
    public workTimeCopy: WorkTime;
    @Input() show: boolean;
    @Input() head: string = '';
    @Input() locked: boolean = false;
    @Input() workTime: WorkTime;
    @Input() isMyJob: boolean = false;
    @Input() iAmTheApprover: boolean = false;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() showChange: EventEmitter<any> = new EventEmitter();
    private body = document.getElementsByTagName('body')[0];

    ngOnInit() {
        if (this.head === '') {
            this.head = 'Confirmation';
        }
        this.initData();
    }

    initData() {

        this.workTimeCopy = new WorkTime(this.workTime);
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

    modalSave() {
        this.save.emit(this.workTimeCopy);
        this.hide();
    }

    modalCancel() {
        this.save.emit(false);
        this.hide();
        this.initData();
    }

}
