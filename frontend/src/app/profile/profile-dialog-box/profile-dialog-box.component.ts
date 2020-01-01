import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'

import { ProfileService } from '../../service/profile.service'
import { FormControl,FormGroup, Validators } from '@angular/forms'

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
		private profileService: ProfileService
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
			console.log(res.json())
		})
	}

}