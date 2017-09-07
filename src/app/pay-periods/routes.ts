import { PayPeriodComponent } from './components/pay-period.component';
import { PayPeriodListComponent } from './components/pay-period-list.component';

export const PayPeriodRoutes = [
    { path: 'pay-period',  component: PayPeriodComponent },
    { path: 'jobs/:jobId/pay-periods',  component: PayPeriodListComponent },
    { path: 'pay-period/:payId/work-times', component : PayPeriodComponent}
];
