import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormControl,FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { ProfileService } from '../../service/profile.service'
import { UserService } from 'src/app/service/user.service';

export interface DialogData{
	heading: string,
	updateFunction: string,

}

@Component({
	selector: 'profile-dialog-box',
	templateUrl: './profile-dialog-box.component.html',
	styleUrls: ['./profile-dialog-box.component.css']
})
export class ProfileDialogBoxComponent{

	constructor(
		public dialogRef: MatDialogRef<ProfileDialogBoxComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private profileService: ProfileService,
		private userService: UserService,
		private matSnackBar: MatSnackBar,
		private router: Router
	) { }

	profileForm = new FormGroup({
		userdata : new FormControl('',Validators.required)
	})

	get userdata() { return this.profileForm.get('userdata') }

	closeDialogBox(): void{
		this.dialogRef.close()
	}

	submitProfile(profileForm,data): void{
		this.profileService.updateUserProfile(profileForm.value, data)
		.subscribe((res)=>{
			let status = res.json().status
			let msg = res.json().msg
			this.dialogRef.close()
			if((status === 200 || status === 400) && data === 'email'){
				this.matSnackBar.open(msg,'Close',{
					duration: 8000
				})
				this.profileService.changeEmailValue(res.json().data)
			}
			else if(status === 200 && data === 'username'){
				this.userService.logout()
				this.router.navigate(['login'])
			}
			else if(status === 400 && data ==='username'){
				this.matSnackBar.open(msg,'Close',{
					duration: 8000
				})
			}
		})
	}

}