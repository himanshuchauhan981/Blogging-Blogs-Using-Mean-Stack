import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms'

import { signupValidators } from '../../signup/signup.validators'

@Component({
	selector: 'password-dialog-box',
	templateUrl: './password-dialog-box.component.html',
	styleUrls: ['./password-dialog-box.component.css']
})
export class PasswordDialogBoxComponent{

	constructor(private dialogRef: MatDialogRef<PasswordDialogBoxComponent>) { }

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

}
