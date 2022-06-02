import {
	BrowserModule,
	BrowserTransferStateModule,
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { SharedModule } from "./shared";
import { UserService } from "./services/user.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardLogged } from "./services/auth-guard-logged.service";
import { AuthGuardNotLogged } from "./services/auth-guard-not-logged.service";

@NgModule({
	declarations: [AppComponent, ...AREAS_COMPONENTS],
	imports: [
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		FormsModule,
		HttpClientModule,
		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production,
		}),
		BrowserTransferStateModule,

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
		AuthGuardLogged,
		AuthGuardNotLogged,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
