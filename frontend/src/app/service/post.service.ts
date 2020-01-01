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

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)
	}


	submitPost = (formData) =>{
		return this.http.post('/api/post',formData,{
			headers: this.headers
		})	
	}

	getAllPost = (skipPostsLimit)=>{
		return this.http.get('/api/post',{
			headers: this.headers,
			params: {
				skipPostsLimit: skipPostsLimit
			}
		})
	}

	getParticularPost = (id)=>{
		return this.http.get(`/api/post/${id}`,{
			headers: this.headers
		})
	}

	getAllParticularUserPost = (username)=>{
		return this.http.get(`/api/${username}/posts`,{
			headers: this.headers
		})
	}

	deleteParticularPost = (postId) =>{
		return this.http.delete(`/api/post/${postId}`,{
			headers: this.headers
		})
	}
}
