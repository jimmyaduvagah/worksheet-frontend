import { Routes, RouterModule } from '@angular/router';
import { PayPeriodRoutes } from './pay-periods/routes';
import { AuthRoutes } from './Auth/auth.routes';
import { JobsRoutes } from './jobs/routes';
import { UserRoutes } from './User/user.routes';
import { AdminRoutes } from './admin/routes';
import { ReportRoutes } from './report/routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';
import { PtoRoutes } from './pto/routes';

const appRoutes: Routes = [
    ...AuthRoutes,
    ...PayPeriodRoutes,
    ...JobsRoutes,
    ...AdminRoutes,
    ...ReportRoutes,
    ...UserRoutes,
    ...DashboardRoutes,
    ...PtoRoutes

];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
