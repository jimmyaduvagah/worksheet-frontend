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

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SessionService } from './services/SessionService';
import { HttpSettingsService } from './services/HttpSettingsService';
import { SettingsService } from './services/SettingsService';
import { AuthService } from './Auth/services/auth.service';
import { WorkTimeReasonService } from './work-times/services/work-time-reason.service';
import { UserService } from './User/services/user.service';
import { HttpModule } from '@angular/http';
import { AuthToken } from './services/AuthToken';

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

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestRouterComponent,
                AppComponent,
                NavbarComponent,
            ],
            imports: [ RouterTestingModule, RouterModule, HttpModule ],
            providers: [
                provideRoutes(config),
                SessionService,
                HttpSettingsService,
                SettingsService,
                AuthService,
                ApplicationRef,
                WorkTimeReasonService,
                UserService,
                AuthToken
            ]
        });
    });

    it('should have a .navbar element', async(() => {
        TestBed.compileComponents().then(() => {
            let fixture: ComponentFixture<AppComponent>;
            fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();

            let compiled = fixture.debugElement.nativeElement;
            expect(compiled).toBeDefined();
            expect(compiled.querySelector('.navbar')).toBeDefined();
        });
    }));
});
