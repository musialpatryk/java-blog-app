import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { BaseLayoutComponent } from './views/base-layout/base-layout.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: 'app',
    component: BaseLayoutComponent,
    children: [
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
