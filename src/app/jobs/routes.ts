import {JobComponent} from './components/job.component';
import {JobsComponent} from './components/jobs.component';

export const JobsRoutes = [
    { path: 'jobs',  component: JobsComponent },
    { path: 'jobs/:id',  component: JobComponent }
];
