import { Injectable, Output, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { AuthGuardService } from './auth-guard.service'
import { UserService } from './user.service'
import { environment } from '../../environments/environment'


@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	basicUrl : string = environment.basicUrl

	@Output() fire: EventEmitter<any> = new EventEmitter()

	user : { id: string, username: string, email: string, profileImage: string, name:string } = null

	authorized: Boolean = false

	defaultProfileImage: string = 'https://pngimage.net/wp-content/uploads/2018/05/default-user-image-png-7.png'

	constructor(
		private http: HttpClient,
		private authGuardService: AuthGuardService,
		private userService: UserService,
		private router: Router
	) { }

	getProfile() {
		let headers = this.userService.appendHeaders()

		this.http.get(`${this.basicUrl}/api${this.router.url}`, {
			headers: headers
		})
		.subscribe((res:any) =>{
			let profileData = res.userDetails
			profileData.name = profileData.firstName + ' '+profileData.lastName
			if(profileData.profileImage != null){
				profileData.profileImage = `${environment.basicUrl}/api/image/${profileData.profileImage}`
			}
			this.user = profileData
			this.authorized = res.authorized
			this.userService.titleObservable.next(`${this.user.name}`)
		})
	}

	updateProfile(object, updateStatus) {
		let headers = this.userService.appendHeaders()

		return this.http.patch(`${this.basicUrl}/api/${this.authGuardService.currentUser}/${updateStatus}`, object, {
			headers: headers
		})
	}

	updatePassword(object) {
		let headers = this.userService.appendHeaders()

		return this.http.patch(`${this.basicUrl}/api${this.router.url}/password`,object,{
			headers: headers
		})
	}

	changeEmailValue(data){
		this.fire.emit(data);
	}

	emailValue(){
		return this.fire
	}

	username(id){
		let headers = this.userService.appendHeaders()

		return this.http.get(`${this.basicUrl}/api/profile/id`,{
			headers: headers,
			params: {
				id: id
			}
		})
	}

	getAllProfileName(){
		let headers = this.userService.appendHeaders()

		return this.http.get(`${this.basicUrl}/api/profile/name`,{
			headers: headers
		})
	}
}
