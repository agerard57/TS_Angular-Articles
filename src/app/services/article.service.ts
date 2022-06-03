import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Article } from "../shared/models/article.model";

@Injectable()
export class ArticleService {
	urlBase = "https://reseau.jdedev.fr/api/article"; //CLEAN THIS IN ENV

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private http: HttpClient) {}

	addArticle(article: Article): Observable<Article> {
		return this.http.post<Article>(this.urlBase, article);
	}

	getArticle(id: number): Observable<Article> {
		return this.http.get<Article>(`${this.urlBase}/${id}`);
	}

	getArticles(): Observable<Article[]> {
		return this.http.get<Article[]>(this.urlBase);
	}

	getCommentByArticle(id: number): Observable<Article> {
		return this.http.get<Article>(`${this.urlBase}/${id}/comment`);
	}

	editArticle(article: Article, id: number): Observable<any> {
		return this.http.put(`${this.urlBase}/${id}`, article, {
			responseType: "text",
		});
	}

	deleteArticle(id: number): Observable<any> {
		return this.http.delete(`${this.urlBase}/${id}`, {
			responseType: "text",
		});
	}
}
