import { UserAdminListComponent } from './components/users-admin-list.component';
import { JobsAdminListComponent } from './components/jobs-admin-list.component';
import { JobAdminComponent } from './components/job-admin.component';
import { UserAdminComponent } from './components/user-admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';

export const AdminRoutes = [
    { path: 'admin/user',  component: UserAdminComponent},
    { path: 'admin/user/:id',  component: UserAdminComponent},
    { path: 'admin/users',  component: UserAdminListComponent},
    { path: 'admin/jobs',  component: JobsAdminListComponent},
    { path: 'admin/job',  component: JobAdminComponent},
    { path: 'admin/job/:id',  component: JobAdminComponent},
    { path: 'admin/dashboard',  component: AdminDashboardComponent},
];

