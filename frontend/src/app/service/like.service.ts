import { Injectable, Inject } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class LikeService {

	token: string

	private basicUrl : string = environment.basicUrl

	constructor(private http: Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

	saveOrDeletePostLike(postId){
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.post(`${this.basicUrl}/api/${postId}/like`,null,{
			headers: headers
		})
	}


}
