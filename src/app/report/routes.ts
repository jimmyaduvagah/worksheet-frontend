import { PayrollReportComponent } from './components/payroll-report.component';
import { VacationSickdayComponent } from './components/vacation-sickday-report.component';

export const ReportRoutes = [
    { path: 'admin/reports',  component: PayrollReportComponent },
    { path: 'admin/vacation-sickday-report',  component: VacationSickdayComponent }
];

