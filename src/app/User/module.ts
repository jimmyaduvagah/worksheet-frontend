import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { UserService } from './services/user.service';
import { UserAccountManagementComponent } from './components/user-account-management.component';
import { ConfirmPasswordComponent } from './components/confirm-password.compont';

@NgModule({
    declarations: [
        UserComponent,
        UserAccountManagementComponent,
        ForgotPasswordComponent,
        ConfirmPasswordComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        UserComponent,
        UserAccountManagementComponent,
        ForgotPasswordComponent,
        ConfirmPasswordComponent
    ],
    providers: [
        UserService
    ]
})

export class UserModule {
}
