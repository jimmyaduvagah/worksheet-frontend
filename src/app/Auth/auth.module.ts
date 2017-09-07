import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth.component';
import { APP_PROVIDERS } from '../app.providers';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../directives/Loading/loading.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        RouterModule,

    ],
    exports: [
        AuthComponent
    ],
    providers: [ APP_PROVIDERS ],
})
export class AuthModule {
}
