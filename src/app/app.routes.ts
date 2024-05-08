import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CarsComponent } from './components/cars/cars.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentComponent } from './components/payments/payment/payment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SuccessPaymentComponent } from './components/payments/success-payment/success-payment.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'About', component: AboutComponent },
    { path: 'Cars', component: CarsComponent },
    { path: 'Contact', component: ContactComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Register', component: RegisterComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'Success/:date/:method/:amount', component: SuccessPaymentComponent }, 
    { path: '**', component: NotFoundComponent }
];
