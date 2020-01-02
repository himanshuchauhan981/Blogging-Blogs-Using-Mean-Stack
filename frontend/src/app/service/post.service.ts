import { Injectable,Inject } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

@Injectable({
	providedIn: 'root'
})
export class PostService {

	token: string

	headers 

	constructor(private http: Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
		this.token = this.storage.get('token')

		this.headers = new Headers()
		this.headers.append('Authorization', `Bearer ${this.token}`)
	}


	submitPost = (formData) =>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.post('/api/post',formData,{
			headers: headers
		})	
	}

	getAllPost = (skipPostsLimit)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get('/api/post',{
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

		return this.http.get(`/api/post/${id}`,{
			headers: headers
		})
	}

	getAllParticularUserPost = (username)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`/api/${username}/posts`,{
			headers: headers
		})
	}

	deleteParticularPost = (postId) =>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.delete(`/api/post/${postId}`,{
			headers: headers
		})
	}
}
