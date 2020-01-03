import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { ProfileDialogBoxComponent } from '../dialog-box/profile-dialog-box/profile-dialog-box.component'
import { PasswordDialogBoxComponent } from '../dialog-box/password-dialog-box/password-dialog-box.component'
import { ProfileService } from '../service/profile.service'

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user = { id:String, username: String, email: String}

	authorized: Boolean = false

	constructor(
		public matDialog: MatDialog,
		private profileService: ProfileService,
	) { }

	ngOnInit() {
		this.profileService.getUserProfileData()
			.subscribe((res) => {
				if (res.json().status === 200) {
					this.user = res.json().data[0]
					this.authorized = res.json().authorized
				}
			})
		this.profileService.getEmittedEmailValue()
			.subscribe(data=>{
				if(data!=undefined){
					this.user.email = data
				}
			})
	}

	openDialogBox(heading) {
		this.matDialog.open(ProfileDialogBoxComponent, {
			width: '350px',
			data: { heading: heading }
		})
	}

	openPasswordDialogBox(){
		this.matDialog.open(PasswordDialogBoxComponent, {
			width: '350px'
		})
	}

}
