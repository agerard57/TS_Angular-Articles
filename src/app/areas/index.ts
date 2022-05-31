import { Routes } from '@angular/router';

import { AddArticleComponent } from './article-add/article-add.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const AREAS_ROUTES: Routes = [
	{ path: "", component: HomeComponent, pathMatch: "full" },
	{ path: "error", component: ErrorComponent },
	{ path: "article/add", component: AddArticleComponent  },
	{ path: "auth", component: AuthComponent },
	{ path: "article/list", component: ArticleListComponent },
	{ path: "user/profile", component: UserProfileComponent },
	{ path: "user/list", component: UserListComponent },
	{ path: "**", component: NotFoundComponent },
	
];

export const AREAS_COMPONENTS = [
	NavComponent,

	// pages
	HomeComponent,
	AddArticleComponent,
	AuthComponent,
	UserProfileComponent,
	UserListComponent,
	ErrorComponent,
	NotFoundComponent,
	ArticleListComponent
];
