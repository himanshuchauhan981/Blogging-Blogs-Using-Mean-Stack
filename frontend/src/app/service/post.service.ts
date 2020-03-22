import { Injectable,Inject } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class PostService {

	private basicUrl : string = environment.basicUrl

	token: string

	constructor(private http: Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }


	submitPost = (formData) =>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.post(`${this.basicUrl}/api/post`,formData,{
			headers: headers
		})	
	}

	getAllPost = (skipPostsLimit)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`${this.basicUrl}/api/post`,{
			headers: headers,
			params: {
				skipPostsLimit: skipPostsLimit
			}
		})
	}

	getParticularPost = (id)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`${this.basicUrl}/api/post/${id}`,{
			headers: headers
		})
	}

	getAllParticularUserPost = (username)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`${this.basicUrl}/api/${username}/posts`,{
			headers: headers
		})
	}

	deleteParticularPost = (postId) =>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.delete(`${this.basicUrl}/api/post/${postId}`,{
			headers: headers
		})
	}

	editPost = (username,postId,postData)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization',`Bearer ${this.token}`)

		return this.http.patch(`${this.basicUrl}/api/${username}/${postId}`,postData,{
			headers: headers
		})
	}
}
