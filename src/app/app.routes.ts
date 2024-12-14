import { Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { VehicleDataComponent } from './vehicle-data/vehicle-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { authguardGuard } from './authguard.guard';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent,canActivate:[authguardGuard] },
    { path: 'user-data', component: UserDataComponent,canActivate:[authguardGuard]  },
    { path: 'vehicle-data', component: VehicleDataComponent,canActivate:[authguardGuard]  },
    { path: 'privacy-policy', component: PrivacyComponent,canActivate:[authguardGuard]  },
    { path: 'terms-of-service', component: TermsComponent,canActivate:[authguardGuard]  },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotfoundpageComponent }
];
