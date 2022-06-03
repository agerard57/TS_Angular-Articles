import {
	BrowserModule,
	BrowserTransferStateModule,
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { PIPES_COMPONENTS } from "./pipes/index";
import { SERVICES } from "./services/index";
import { SharedModule } from "./shared";
import { TokenInterceptorService } from "./services/token-interceptor.service";

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
				tokenGetter: (): string | null => localStorage.getItem("token"),
			},
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
		...SERVICES,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
