import { Injectable, Inject, Output, EventEmitter } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'
import { Router } from '@angular/router';

import { AuthGuardService } from './auth-guard.service'

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	token: string

	@Output() fire: EventEmitter<any> = new EventEmitter()

	defaultProfileImage: string = 'https://pngimage.net/wp-content/uploads/2018/05/default-user-image-png-7.png'

	constructor(
		private http: Http,
		@Inject(SESSION_STORAGE) private storage: WebStorageService,
		private authGuardService: AuthGuardService,
		private router: Router
	) { }

	getUserProfileData() {
		this.token = this.storage.get('token')
		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`/api${this.router.url}`, {
			headers: headers
		})
	}

	updateUserProfile(object, updateStatus) {
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.patch(`/api/${this.authGuardService.currentUser}/${updateStatus}`, object, {
			headers: headers
		})
	}

	updateUserPassword(object) {
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.patch(`/api${this.router.url}/password`,object,{
			headers: headers
		})
	}

	changeEmailValue(data){
		this.fire.emit(data);
	}

	getEmittedEmailValue(){
		return this.fire
	}

	profileUsername(id){
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`/api/profile/id/${id}`,{
			headers: headers
		})
	}

	getAllProfileName(){
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`/api/profile/name`,{
			headers: headers
		})
	}
}
