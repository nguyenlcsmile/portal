import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorPageComponent } from './components/monitor-page/monitor-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
// import { ForgotPasswordPageComponent } from './auth/forgot-password-page/forgot-password-page.component';
import { CustomerDetailPageComponent } from './components/customer-page/detail-page/customer-detail-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
// import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'v2/home-page', pathMatch: 'full' },
    { path: 'v2/login-page', component: LoginPageComponent },
    // { path: 'v2/forgot-password-page', component: ForgotPasswordPageComponent },
    { path: 'v2/home-page', component: HomePageComponent },
    { path: 'v2/monitor-page', component: MonitorPageComponent },
    // {
    //     path: 'v2/customer-page', component: CustomerPageComponent,
    //     children: [
    //         { path: '', redirectTo: 'v2/customer-page', pathMatch: 'full' },
    //         { path: 'detail', component: CustomerDetailPageComponent }
    //     ]
    // },
    { path: 'v2/customer-page', component: CustomerPageComponent},
    { path: 'v2/customer-page/detail', component: CustomerDetailPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
