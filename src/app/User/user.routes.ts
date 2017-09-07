import {UserComponent} from './components/user.component';
import { UserAccountManagementComponent } from './components/user-account-management.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { ConfirmPasswordComponent } from './components/confirm-password.compont';

export const UserRoutes = [
    // { path: 'users',  component: UserComponent },
    // { path: 'users/my-account',  component: UserAccountManagementComponent },
    { path: 'auth/forgot-password',  component: ForgotPasswordComponent },
    { path: 'auth/forgot-password/reset/confirm/:uid/:token',  component: ConfirmPasswordComponent },
];




