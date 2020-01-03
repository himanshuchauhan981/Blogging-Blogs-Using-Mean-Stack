import { Injectable, Inject, Output, EventEmitter } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

@Injectable({
	providedIn: 'root'
})
export class CommentService {

	token: string

	@Output() deleteCommentEvent: EventEmitter<any> = new EventEmitter()

	constructor(private http: Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

	submitNewComment(object, postId) {
		let commentObject = {
			postId: postId,
			text: object.comment,
			createdBy: null
		}

		this.token = this.storage.get('token')
		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.post('/api/comment', commentObject, {
			headers: headers
		})
	}

	getParticularPostComment(postId) {
		this.token = this.storage.get('token')
		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get('/api/comment', {
			headers: headers,
			params: { postId: postId }
		})
	}

	deleteComment(id){
		this.token = this.storage.get('token')
		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.delete(`/api/comment/${id}`,{
			headers: headers
		})
	}

	changeComment(data){
		this.deleteCommentEvent.emit(data)
	}

	getEmittedComment(){
		return this.deleteCommentEvent
	}
}
