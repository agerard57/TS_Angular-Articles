import {
	BrowserModule,
	BrowserTransferStateModule,
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { PIPES_COMPONENTS } from "./pipes/index";
import { SharedModule } from "./shared";
import { UserService } from "./services/user.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardLogged } from "./services/auth-guard-logged.service";
import { AuthGuardNotLogged } from "./services/auth-guard-not-logged.service";
import { ArticleService } from "./services/article.service";
import { CommentService } from "./services/comment.service";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [AppComponent, ...AREAS_COMPONENTS, ...PIPES_COMPONENTS],
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		HttpClientModule,
		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production,
		}),
		BrowserTransferStateModule,
		JwtModule.forRoot({
			config: {
			  tokenGetter: (): string | null => localStorage.getItem('token'),
			}
		  }),
		SharedModule,
		AppRoutingModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true,
		},
		AuthService,
		UserService,
		ArticleService,
		CommentService,
		AuthGuardLogged,
		AuthGuardNotLogged,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
