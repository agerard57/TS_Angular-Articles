import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { AuthGuardLogged } from "./auth-guard-logged.service";
import { AuthGuardNotLogged } from "./auth-guard-not-logged.service";
import { FindUsernameById } from "./find-username-by-id.service";
import { ArticleService } from "./article.service";
import { CommentService } from "./comment.service";

export const SERVICES = [
	AuthService,
	UserService,
	FindUsernameById,
	ArticleService,
	CommentService,
	AuthGuardLogged,
	AuthGuardNotLogged,
];
