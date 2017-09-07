import { NgModule } from '@angular/core';
import { APP_PROVIDERS } from './app.providers';
import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { NavbarModule } from './shared';
import { AuthService } from './Auth/services/auth.service';
import { SessionService } from './services/SessionService';
import { SettingsService } from './services/SettingsService';
import { HttpSettingsService } from './services/HttpSettingsService';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './Auth/auth.module';
import { HttpModule } from '@angular/http';
import { AuthToken } from './services/AuthToken';
import { LoadingModule } from './directives/Loading/loading.module';
import { WorkTimesModule } from './work-times/module';
import { JobsModule } from './jobs/module';
import { UserModule } from './User/module';
import { AdminModule } from './admin/module';
import { ReportModule } from './report/module';
import { PayPeriodsModule } from './pay-periods/module';
import { BootstrapModule } from './directives/Bootstrap/bootstrap.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PtoModule } from './pto/module';
import { SickDayModule } from './sick_day/module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NavbarModule,
        AuthModule,
        LoadingModule,
        BootstrapModule,
        routing,
        BrowserModule,
        HttpModule,
        WorkTimesModule,
        JobsModule,
        UserModule,
        AdminModule,
        ReportModule,
        PayPeriodsModule,
        DashboardModule,
        PtoModule,
        SickDayModule
    ],
    providers: [
        APP_PROVIDERS,
        appRoutingProviders,
        AuthService,
        AuthToken,
        SessionService,
        SettingsService,
        HttpSettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
