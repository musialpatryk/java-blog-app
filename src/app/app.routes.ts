import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { LoggedInLayoutComponent } from './components/logged-in-layout/logged-in-layout.component';
import { LoginComponent } from './views/login/login.component';
import { LoggedOutLayoutComponent } from './components/logged-out-layout/logged-out-layout.component';
import { RegisterComponent } from './views/register/register.component';
import { PostsComponent } from './views/posts/posts.component';
import { PostDetailComponent } from './views/post-detail/post-detail.component';
import { PostFormComponent } from './modules/posts/components/post-form/post-form.component';
import { UserFormComponent } from './modules/users/components/user-form/user-form.component';
import { inject } from '@angular/core';
import { UserService } from './modules/users/services/user.service';

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
        path: 'post-details/:postId',
        component: PostDetailComponent,
      },
      {
        path: 'post-form/:postId',
        component: PostFormComponent,
      },
      {
        path: 'post-form',
        component: PostFormComponent,
      },
      {
        path: 'user-form',
        component: UserFormComponent,
        resolve: {
          user: () => inject(UserService).getCurrentUser(),
        },
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
