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
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		this.token = this.storage.get('token')
		return this.http.post('/api/post',formData,{
			headers: headers
		})	
	}
}
