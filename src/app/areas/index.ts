import { Routes } from "@angular/router";

import { AddArticleComponent } from "./article-add/article-add.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { RegisterComponent } from "./register/register.component";
import { RestrictedComponent } from "./restricted/restricted.component";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { NavComponent } from "./nav/nav.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ViewArticleComponent } from "./article-view/article-view.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuardLogged } from "../services/auth-guard-logged.service";
import { AuthGuardNotLogged } from "../services/auth-guard-not-logged.service";
import { ArticleViewCommentsComponent } from "./article-view-comments/article-view-comments.component";
import { UserProfileEditComponent } from "./user-profile-edit/user-profile-edit.component";

export const AREAS_ROUTES: Routes = [
	{ path: "", component: HomeComponent, pathMatch: "full" },
	{ path: "error", component: ErrorComponent },
	{ path: "restricted", component: RestrictedComponent },
	{
		path: "article/add",
		component: AddArticleComponent,
		canActivate: [AuthGuardLogged],
	},
	{
		path: "article/list",
		component: ArticleListComponent,
		canActivate: [AuthGuardLogged],
	},
	{
		path: "article/:id",
		component: ViewArticleComponent,
		canActivate: [AuthGuardLogged],
	},
	{
		path: "user/register",
		component: RegisterComponent,
		canActivate: [AuthGuardNotLogged],
	},
	{
		path: "user/login",
		component: LoginComponent,
		canActivate: [AuthGuardNotLogged],
	},
	{
		path: "user/logout",
		component: LogoutComponent,
		canActivate: [AuthGuardLogged],
	},
	{
		path: "user/list",
		component: UserListComponent,
		canActivate: [AuthGuardLogged],
	},
	{
		path: "user/:id",
		component: UserProfileComponent,
		canActivate: [AuthGuardLogged],
	},
	{ path: "**", component: NotFoundComponent },
];

export const AREAS_COMPONENTS = [
	NavComponent,

	// pages
	HomeComponent,
	AddArticleComponent,
	RegisterComponent,
	RestrictedComponent,
	LoginComponent,
	ArticleViewCommentsComponent,
	LogoutComponent,
	UserProfileComponent,
	UserListComponent,
	UserProfileEditComponent,
	ErrorComponent,
	NotFoundComponent,
	ArticleListComponent,
	ViewArticleComponent,
];
