import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorPageComponent } from './components/monitor-page/monitor-page.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'home-page', pathMatch: 'full' },
    { path: 'home-page', component: HomePageComponent},
    { path: 'monitor-page', component: MonitorPageComponent},
    { path: 'customer-page', component: CustomerPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
