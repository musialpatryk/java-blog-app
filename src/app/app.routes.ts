import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { LoggedInLayoutComponent } from './components/logged-in-layout/logged-in-layout.component';
import { LoginComponent } from './views/login/login.component';
import { LoggedOutLayoutComponent } from './components/logged-out-layout/logged-out-layout.component';
import { RegisterComponent } from './views/register/register.component';
import { PostsComponent } from './views/posts/posts.component';

export const routes: Routes = [
  {
    path: 'app',
    component: LoggedInLayoutComponent,
    children: [
      {
        path: '',
        component: PostsComponent,
      },
      {
        path: 'my-posts',
        component: PostsComponent,
        data: { onlyCurrentUser: true },
      },
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
        component: PostsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];
