import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { ProfileDialogBoxComponent } from '../dialog-box/profile-dialog-box/profile-dialog-box.component'
import { PasswordDialogBoxComponent } from '../dialog-box/password-dialog-box/password-dialog-box.component'
import { ProfileService, User } from '../service/profile.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

	user : User = null

	authorized: Boolean = false

	name : string

	defaultProfileImage : string

	profileId : string

	constructor(
		private router: Router,
		public matDialog: MatDialog,
		private profileService: ProfileService,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {

		this.profileService.emailValue()
		.subscribe(data => {
			if (data != undefined) {
				this.user.email = data
			}
		})

		this.defaultProfileImage = this.profileService.defaultProfileImage

		this.activatedRoute.params.subscribe(params =>{
			this.profileId = params.id
			this.profileService.getProfile()
		})
	}

	// openDialogBox(heading) {
	// 	this.matDialog.open(ProfileDialogBoxComponent, {
	// 		width: '350px',
	// 		data: { heading: heading }
	// 	})
	// }

	// openPasswordDialogBox() {
	// 	this.matDialog.open(PasswordDialogBoxComponent, {
	// 		width: '450px'
	// 	})
	// }

	edit(){
		this.router.navigate(['edit'],{relativeTo: this.activatedRoute})
	}

}