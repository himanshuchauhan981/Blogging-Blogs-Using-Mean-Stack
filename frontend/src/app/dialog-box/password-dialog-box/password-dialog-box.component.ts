import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { signupValidators } from '../../signup/signup-form/signup.validators'
import { ProfileService } from '../../service/profile.service'

@Component({
	selector: 'password-dialog-box',
	templateUrl: './password-dialog-box.component.html',
	styleUrls: ['./password-dialog-box.component.css']
})
export class PasswordDialogBoxComponent{

	constructor(
		private dialogRef: MatDialogRef<PasswordDialogBoxComponent>, 
		private profileService: ProfileService,
		private matSnackBar: MatSnackBar
	) { }

	passwordProfileForm = new FormGroup({
		currentPassword: new FormControl('',[Validators.required]),
		password: new FormControl('',[
			Validators.required,
			Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
			Validators.minLength(6)
		]),
		confirmPassword: new FormControl('',[Validators.required])
	},{
		validators: signupValidators.MustMatch
	})
	
	closePasswordDialogBox(){
		this.dialogRef.close()
	}

	get currentPassword() { return this.passwordProfileForm.get('currentPassword') }

	get password() { return this.passwordProfileForm.get('password') }

	get confirmPassword() { return this.passwordProfileForm.get('confirmPassword') }

	submitNewPassword(passwordProfileForm){
		this.profileService.updatePassword(passwordProfileForm.value)
		.subscribe((res:any)=>{
			this.dialogRef.close()
			if(res.json().status === 200){
				this.matSnackBar.open(res.json().msg,'Close',{
					duration: 3000
				})
			}
			else if(res.json().status === 400){
				this.matSnackBar.open(res.json().msg,'Close',{
					duration: 3000
				})
			}

		})
	}

}
