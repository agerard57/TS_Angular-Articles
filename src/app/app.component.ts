import {
	Component,
	AfterViewChecked,
	ChangeDetectorRef,
	OnInit,
} from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewChecked, OnInit {
	constructor(
		public auth: AuthService,
		private changeDetector: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.auth.init();
	}

	ngAfterViewChecked(): void {
		this.changeDetector.detectChanges();
	}
}
