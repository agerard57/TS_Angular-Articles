import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../shared/models/user.model";

// URL in var or in env
// Avatars URL
@Injectable()
export class UserService {
	urlBase = "https://reseau.jdedev.fr/api/user"; //CLEAN THIS IN ENV

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private http: HttpClient) {}

	register(user: User): Observable<User> {
		return this.http.post<User>(this.urlBase, user);
	}

	login(credentials: object): Observable<any> {
		return this.http.post(this.urlBase + "/connect", credentials);
	}

	getUser(id: number): Observable<User> {
		return this.http.get<User>(`${this.urlBase}/${id}`); //DON'T LET IN PUBLIC IF ID IS PRIVATE
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.urlBase);
	}

	getArticlesByUser(id: number): Observable<any> {
		return this.http.get<User>(this.urlBase + `/${id}/article`);
	}

	getCommentsByUser(id: number): Observable<any> {
		return this.http.get<User>(this.urlBase + `/${id}/comment`);
	}

	editUser(user: User): Observable<any> {
		return this.http.put(`${this.urlBase}/${user.id}`, user, {
			responseType: "text",
		});
	}

	deleteUser(id: number): Observable<any> {
		return this.http.delete(`${this.urlBase}/${id}`, {
			responseType: "text",
		});
	}
}
