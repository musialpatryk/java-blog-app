import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { LoggedInLayoutComponent } from './views/logged-in-layout/logged-in-layout.component';
import { LoginComponent } from './views/login/login.component';
import { LoggedOutLayoutComponent } from './views/logged-out-layout/logged-out-layout.component';

export const routes: Routes = [
  {
    path: 'app',
    component: LoggedInLayoutComponent,
    children: [
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: '',
    component: LoggedOutLayoutComponent,
    children: [
      {
        path: '',
        component: PageNotFoundComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];
