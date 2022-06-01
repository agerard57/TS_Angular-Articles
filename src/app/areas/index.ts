import { Routes } from '@angular/router';

import { AddArticleComponent } from './article-add/article-add.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const AREAS_ROUTES: Routes = [
	{ path: "", component: HomeComponent, pathMatch: "full" },
	{ path: "error", component: ErrorComponent },
	{ path: "article/add", component: AddArticleComponent  },
	{ path: "article/list", component: ArticleListComponent },
	{ path: "user/register", component: RegisterComponent },
	{ path: "user/login", component: LoginComponent },
	{ path: "user/logout", component: LogoutComponent },
	{ path: "user/list", component: UserListComponent },
	{ path: "user/profile", component: UserProfileComponent },
	{ path: "**", component: NotFoundComponent },
	//canActivate: [AuthGuard]
];

export const AREAS_COMPONENTS = [
	NavComponent,

	// pages
	HomeComponent,
	AddArticleComponent,
	RegisterComponent,
	LoginComponent,
	LogoutComponent,
	UserProfileComponent,
	UserListComponent,
	ErrorComponent,
	NotFoundComponent,
	ArticleListComponent
];
