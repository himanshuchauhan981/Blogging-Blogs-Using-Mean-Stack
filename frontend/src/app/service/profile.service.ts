import { Injectable, Output, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { AuthGuardService } from './auth-guard.service'
import { UserService } from './user.service'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	basicUrl : string = environment.basicUrl

	@Output() fire: EventEmitter<any> = new EventEmitter()

	user : User 

	authorized: Boolean = false

	defaultProfileImage: string = 'https://pngimage.net/wp-content/uploads/2018/05/default-user-image-png-7.png'

	private _profileNames: string[]

	public model: ProfileNames

	formatter = (profileName: ProfileNames) => profileName.fullName

	private _nameList(){
		let headers = this.userService.appendHeaders()

		return this.http.get(`${this.basicUrl}/api/profile/name`,{
			headers: headers
		})
	}

	constructor(
		private http: HttpClient,
		private authGuardService: AuthGuardService,
		private userService: UserService,
		private router: Router,
		private titleService: Title
	){ }

	getProfile() {
		let headers = this.userService.appendHeaders()

		this.http.get(`${this.basicUrl}/api${this.router.url}`, {
			headers: headers
		})
		.subscribe((res:any) =>{
			let profileData = res.userDetails
			profileData.name = `${profileData.firstName} ${profileData.lastName}`
			this.titleService.setTitle(`${profileData.name} - Blogging Blogs`)
			if(profileData.profileImage != null){
				profileData.profileImage = `${environment.basicUrl}/api/image/${profileData.profileImage}`
			}
			this.user = profileData
			this.authorized = res.authorized
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

	username(id: string){
		let headers = this.userService.appendHeaders()

		return this.http.get(`${this.basicUrl}/api/profile/id`,{
			headers: headers,
			params: {
				id: id
			}
		})
	}

	prepareProfileNames(){
		this._nameList().subscribe((res:any) =>{
			this._profileNames = res
		})
	}

	typeahead  = (text$: Observable<string>) => text$.pipe(
		debounceTime(200),
		distinctUntilChanged(),
		filter(keyword => keyword.length >= 2),
		map(keyword => this._profileNames.filter(data  => data['fullName'].toLowerCase().indexOf(keyword.toLowerCase())> -1))
	)

	redirectToProfilePage(id: string){
		this.username(id)
		.subscribe((res:any)=>{
			this.router.navigate([`/profile/${res.username}`])
		})	
	}
}

export interface ProfileNames{
	id: string,
	fullName: string
}

export interface User {
	id: string,
	username: string,
	email: string,
	profileImage: string,
	name:string 
}