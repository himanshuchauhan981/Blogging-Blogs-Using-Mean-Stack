import { Injectable, Inject } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

@Injectable({
	providedIn: 'root'
})
export class CommentService {

	headers 

	token: string

	constructor(private http: Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
		this.token = this.storage.get('token')
		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)
	}

	submitNewComment(object, postId) {
		let commentObject = {
			postId: postId,
			text: object.comment,
			createdBy: null
		}

		return this.http.post('/api/comment', commentObject, {
			headers: this.headers
		})
	}

	getParticularPostComment(postId) {
		return this.http.get('/api/comment', {
			headers: this.headers,
			params: { postId: postId }
		})
	}
}
