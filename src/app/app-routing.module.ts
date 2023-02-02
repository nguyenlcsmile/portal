import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorPageComponent } from './components/monitor-page/monitor-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ForgotPasswordPageComponent } from './auth/forgot-password-page/forgot-password-page.component';
import { CustomerDetailPageComponent } from './components/customer-page/detail-page/customer-detail-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'home-page', pathMatch: 'full' },
    { path: 'login-page', component: LoginPageComponent },
    { path: 'forgot-password-page', component: ForgotPasswordPageComponent },
    { path: 'home-page', component: HomePageComponent },
    { path: 'monitor-page', component: MonitorPageComponent },
    {
        path: 'customer-page', component: CustomerPageComponent,
        children: [
            { path: '', redirectTo: 'customer-page', pathMatch: 'full' },
            { path: 'detail', component: CustomerDetailPageComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
