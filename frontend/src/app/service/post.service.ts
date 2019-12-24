import { Injectable,Inject } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

@Injectable({
	providedIn: 'root'
})
export class PostService {

	constructor(private http: Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

	token: string

	submitPost = (formData) =>{
		console.log(formData.get('postTitle'))
		console.log(formData.get('postContent'))
		this.token = this.storage.get('token')

		// let options = new RequestOptions()
		// options.headers = new Headers()
		// options.headers.append('Content-Type', 'application/json')
		// options.headers.append('Authorization', `Bearer ${this.token}`)

		let headers = new Headers()
		// headers.append('Content-Type', 'multipart/form-data')
		headers.append('Authorization', `Bearer ${this.token}`)

		this.token = this.storage.get('token')
		// return this.http.post('/api/post',formData,{
		// 	headers: headers
		// })
		return this.http.post('/api/post',formData,{
			headers: headers
		})	
	}
}
