import { Injectable, Inject } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

import { AuthGuardService } from './auth-guard.service'

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	token: string

	constructor(
		private http: Http, 
		@Inject(SESSION_STORAGE) private storage: WebStorageService,
		private authGuardService: AuthGuardService
	) { }

	getUserProfileData(){
		this.token = this.storage.get('token')
		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`/api/${this.authGuardService.currentUser}`,{
			headers:headers
		})
	}

	updateUserProfile(updateStatus){
		this.token = this.storage.get('token')
		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)
	}
}
