import { Injectable, Inject } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

import { AuthGuardService } from './auth-guard.service'

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	token: string

	headers

	constructor(
		private http: Http,
		@Inject(SESSION_STORAGE) private storage: WebStorageService,
		private authGuardService: AuthGuardService
	) {
		this.token = this.storage.get('token')
		this.headers = new Headers()
		this.headers.append('Authorization', `Bearer ${this.token}`)
	}

	getUserProfileData() {
		return this.http.get(`/api/${this.authGuardService.currentUser}`, {
			headers: this.headers
		})
	}

	updateUserProfile(updateStatus) {
		return this.http.patch(`/api/${updateStatus}`,{
			headers: this.headers
		})
	}
}
