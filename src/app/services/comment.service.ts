import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Comment } from "../shared/models/comment.model";

@Injectable()
export class CommentService {
	urlBase = "https://reseau.jdedev.fr/api/comment"; //CLEAN THIS IN ENV

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private http: HttpClient) {}

	addComment(comment: Comment): Observable<Comment> {
		return this.http.post<Comment>(this.urlBase, comment);
	}

	getComment(comment: Comment): Observable<Comment> {
		return this.http.get<Comment>(`${this.urlBase}/${comment._comment_id}`); //DON'T LET IN PUBLIC IF ID IS PRIVATE
	}

	getComments(): Observable<Comment[]> {
		return this.http.get<Comment[]>(this.urlBase);
	}

	editComment(comment: Comment): Observable<any> {
		return this.http.put(
			`${this.urlBase}/${comment._comment_id}`,
			comment,
			{
				responseType: "text",
			},
		);
	}

	deleteComment(comment: Comment): Observable<any> {
		return this.http.delete(`${this.urlBase}/${comment._comment_id}`, {
			responseType: "text",
		});
	}
}
