import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { ProfileDialogBoxComponent } from '../dialog-box/profile-dialog-box/profile-dialog-box.component'
import { PasswordDialogBoxComponent } from '../dialog-box/password-dialog-box/password-dialog-box.component'
import { ProfileService } from '../service/profile.service'
import { LoginService } from '../service/login.service'

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

	user : { id: string, username: string, email: string, profileImage: string, name:string } = null

	authorized: Boolean = false

	name : string

	defaultProfileImage : string

	constructor(
		public matDialog: MatDialog,
		private profileService: ProfileService,
		private loginService: LoginService
	) { }

	ngOnInit() {
		this.profileService.getUserProfileData()
			.subscribe((res) => {
				if (res.json().status === 200) {
					this.user = res.json().data
					let firstName = res.json().data.firstName.charAt(0).toUpperCase() + res.json().data.firstName.slice(1)
					let lastName = res.json().data.lastName.charAt(0).toUpperCase() + res.json().data.lastName.slice(1)
					this.user.name = firstName + ' '+lastName
					this.authorized = res.json().authorized
					this.loginService.titleObservable.next(`${this.user.name}`)
				}
			})
		this.profileService.getEmittedEmailValue()
			.subscribe(data => {
				if (data != undefined) {
					this.user.email = data
				}
			})
		this.defaultProfileImage = this.profileService.defaultProfileImage
	}

	openDialogBox(heading) {
		this.matDialog.open(ProfileDialogBoxComponent, {
			width: '350px',
			data: { heading: heading }
		})
	}

	openPasswordDialogBox() {
		this.matDialog.open(PasswordDialogBoxComponent, {
			width: '350px'
		})
	}

}
