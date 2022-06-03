import { Component } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ArticleService } from "app/services/article.service";
import { ToastComponent } from "app/shared/toast/toast.component";

@Component({
	selector: "app-article-add",
	templateUrl: "./article-add.component.html",
	styleUrls: ["./article-add.component.scss"],
})
export class AddArticleComponent {
	articleForm: FormGroup;
	titre = new FormControl("", [
		Validators.required,
		Validators.maxLength(100),
	]);
	contenu = new FormControl("", [
		Validators.required,
		Validators.maxLength(240),
	]);
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		public toast: ToastComponent,
		private articleService: ArticleService,
	) {
		this.articleForm = this.formBuilder.group({
			titre: this.titre,
			contenu: this.contenu,
		});
	}
	setClassTitre(): object {
		return { "is-invalid": !this.titre.pristine && !this.titre.valid };
	}

	setClassContenu(): object {
		return { "is-invalid": !this.contenu.pristine && !this.contenu.valid };
	}

	addArticle(): void {
		this.articleService.addArticle(this.articleForm.value).subscribe({
			next: (_res) => {
				this.toast.setMessage(
					"You successfully added an article!",
					"success",
				);
				this.router.navigate(["/article/list"]);
			},
			error: (_error) =>
				this.toast.setMessage("Article already exists", "danger"),
		});
	}
}
