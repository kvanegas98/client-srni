import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestComponent } from './components/request/request.component';
import { FacebookComponent } from './components/facebook/facebook.component';

import { UserGuard } from './services/user.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'request', component: RequestComponent, canActivate: [UserGuard] },
  { path: 'facebook', component: FacebookComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes
);
