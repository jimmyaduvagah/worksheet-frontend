import {
    RouterTestingModule
} from '@angular/router/testing';
import {
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import { provideRoutes, Routes, RouterModule } from '@angular/router';
import { Component, ApplicationRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { SessionService } from '../../services/SessionService';
import { HttpSettingsService } from '../../services/HttpSettingsService';
import { SettingsService } from '../../services/SettingsService';
import { AuthService } from '../../Auth/services/auth.service';
import { WorkTimeReasonService } from '../services/work-time-reason.service';
import { UserService } from '../../User/services/user.service';
import { AuthToken } from '../../services/AuthToken';
import { WorkTimeComponent } from './work-time.component';
import { WorkTimesModule } from '../module';
import { WorkTime } from '../models/work-time';
import { SessionMockService } from '../../services/session.mock.service';
import { WorkTimeReasonMockService } from '../services/work-time-reason.mock.service';


let data = {
    'id': 222,
    'modified_on': '2016-10-06T14:17:13.327Z',
    'created_on': '2016-10-03T14:01:09.955Z',
    'modified_by': 5,
    'created_by': null,
    'hours': 0,
    'status_display': 'Not Submitted',
    'absence_reason': null,
    'absence_reason_id': null,
    'date': '2016-10-01',
    'dateObj': '2016-10-01T04:00:00.000Z',
    'user_comment': '',
    'approver_comment': '',
    'approved_on': null,
    'is_approved': false,
    'is_submitted': false,
    'submitted_on': null,
    'status': 'NS',
    'user': 5,
    'job': 5,
    'pay_period': 53,
    'approved_by': null
};

@Component({
    selector: 'as-test-cmp',
    template: '<router-outlet></router-outlet>'
})
class TestRouterComponent {
}

let config: Routes = [
    {
        path: '', component: TestRouterComponent
    }
];

describe('WorkTimeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestRouterComponent
            ],
            imports: [ RouterTestingModule, RouterModule, HttpModule, WorkTimesModule ],
            providers: [
                provideRoutes(config),
                { provide: SessionService, useClass: SessionMockService },
                { provide: WorkTimeReasonService, useClass: WorkTimeReasonMockService },
                HttpSettingsService,
                SettingsService,
                AuthService,
                ApplicationRef,
                UserService,
                AuthToken
            ]
        });
    });

    it('should have a an input element', async(() => {
        TestBed.compileComponents().then(() => {
            let fixture: ComponentFixture<WorkTimeComponent>;
            fixture = TestBed.createComponent(WorkTimeComponent);
            fixture.componentInstance.workTime = new WorkTime(data);
            fixture.componentInstance.loading = false;
            fixture.detectChanges();

            let compiled = fixture.debugElement.nativeElement;
            // expect(compiled).toBeDefined();
            expect(compiled.querySelector('input')).toBeDefined();
        });
    }));
});
