import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { ProfileDialogBoxComponent } from '../dialog-box/profile-dialog-box/profile-dialog-box.component'
import { PasswordDialogBoxComponent } from '../dialog-box/password-dialog-box/password-dialog-box.component'
import { ProfileService } from '../service/profile.service'
import { UserService } from '../service/user.service'
import { Router, NavigationEnd } from '@angular/router'

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
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit() {

		this.profileService.getProfile()

		this.profileService.emailValue()
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
			width: '450px'
		})
	}

}

export interface Profile{
	id: string
	username: string
	email: string
	profileImage: string
	name:string
}