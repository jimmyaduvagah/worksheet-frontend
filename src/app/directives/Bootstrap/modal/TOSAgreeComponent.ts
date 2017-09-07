import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../User/models/user';
import { PayPeriod } from '../../../pay-periods/models/pay-period';

@Component({
    selector: 'as-modal-tos-agree',
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
            <h4 class="modal-title">{{ action }} Confirmation</h4>
          </div>
          <div class="modal-body">
            
            <div *ngIf="action == 'Submit'">
                <!-- User Submission -->
                <!--<p><b>Michelle to provide legal text.</b></p>-->
                <p>I, <b>{{ user.first_name }} {{ user.last_name }}</b>,  certify that this timesheet is a 
                true and accurate representation of the hours I worked. That during each of these hours, 
                I gave my full and best efforts to complete the tasks necessary to ensure the success of 
                the project for which I was responsible.</p>
                <p>I accept that by misrepresenting or falsifying these hours, I would face the real and 
                present risk of legal action being taken against me and that such action may result in damages 
                in excess of the financial rewards I may have achieved by such misrepresentations.</p>
            </div>

            <div *ngIf="action == 'Approve'">
                <!-- Approver Agreement -->
                <p>I, <b>{{ user.first_name }} {{ user.last_name }}</b>,  
                certify that this timesheet is a true and accurate representation of the hours 
                <b>{{ payPeriod.user.first_name }} {{ payPeriod.user.last_name }}</b> worked.</p>
            </div>

            <div *ngIf="action == 'Un-Submit' || action == 'Reject'" class="padding">
                <!-- Unsubmit/Reject Reason -->

                    <h3 *ngIf="action == 'Un-Submit'">Please give a reason before un-submitting</h3>
                    <h3 *ngIf="action == 'Reject'">Please give a reason for rejection</h3>
                    <label>{{ action }} Reason</label>
                    <textarea [(ngModel)]="tosData.reason" style='width:100%;' rows="4" class="form-control"></textarea>


            </div>
            
            <div class="checkbox" *ngIf="action == 'Submit' || action == 'Approve'" >
            <label>
              <input type="checkbox" [(ngModel)]="tosData.iAgree" > I Agree
            </label>
            </div>
            
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-action" (click)="modalCancel($event)" data-dismiss="modal">Cancel</button>
             
             <button 
             *ngIf="action == 'Submit' || action == 'Approve'" 
             type="button" class="btn btn-primary modal-action" 
             (click)="modalSave($event)" 
             [disabled]="!tosData.iAgree"
             >
                {{ action }}
             </button>
                
               <button 
               *ngIf="action == 'Un-Submit' || action == 'Reject'" 
               type="button" class="btn btn-primary modal-action" 
               (click)="modalSave($event)" 
               [disabled]="tosData.reason == ''"
               >
                    {{ action }}
                </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" [class.in]="show" [style.display]="show?'block':'none'" ></div>
    `
})

export class TOSAgreeComponent implements OnInit {
    public tosData: {reason: string, iAgree: boolean, do: string};
    @Input() show: boolean;
    @Input() payPeriod: PayPeriod;
    @Input() user: User;
    @Input() action: string = '';
    @Input() actionToDo: string = '';
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() showChange: EventEmitter<any> = new EventEmitter();
    private body = document.getElementsByTagName('body')[0];

    ngOnInit() {

        this.initData();
    }

    initData() {
        this.tosData = {reason: '', iAgree: false, do: this.actionToDo};
        console.log(this.action, this.tosData);
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
        this.tosData.do = this.actionToDo; // just be sure we have the current action...
        this.save.emit(this.tosData);
        this.hide();
    }

    modalCancel() {
        this.save.emit(false);
        this.hide();
        this.initData();
    }

}
