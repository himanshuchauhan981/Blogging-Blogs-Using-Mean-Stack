import { Injectable,Inject } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

@Injectable({
	providedIn: 'root'
})
export class PostService {

	token: string

	constructor(private http: Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
		
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
}
