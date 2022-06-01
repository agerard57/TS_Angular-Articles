import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../shared/models/user.model";
// URL in var or in env
// Avatars URL
@Injectable()
export class UserService {
	urlBase = "https://reseau.jdedev.fr/api/user"	
	
	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		})
	}

	constructor(
		private http: HttpClient) {}

	
	register(user: User): Observable<User> {
		return this.http.post<User>(this.urlBase, user);
	}

	login(credentials: object): Observable<any> {
		return this.http.post(this.urlBase +"/connect", credentials);
	}

	getUser(user: User): Observable<User> {
		return this.http.get<User>(`${this.urlBase}/${user._id}`); //DON'T LET IN PUBLIC IF ID IS PRIVATE
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.urlBase);
	}

/* 	getArticlesByUser(user: User): Observable<Article[]> {
		return this.http.get<User>(this.urlBase + `/${user._id}/article`);
	} */

/* 	getCommentsByUser(user: User): Observable<Comments[]> {
		return this.http.get<User>(this.urlBase + `/${user._id}/comment`);
	} */

	editUser(user: User): Observable<any> {
		return this.http.put(`${this.urlBase}/${user._id}`, user, {
			responseType: "text",
		});
	}

	deleteUser(user: User): Observable<any> {
		return this.http.delete(`${this.urlBase}/${user._id}`, {
			responseType: "text",
		});
	}
}
