import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { signupValidators } from './signup.validators'
import { SignupService } from '../service/signup.service'

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent {

	signupError : string = null

	constructor(private signupService: SignupService) { }

	signupForm = new FormGroup({
		username: new FormControl('',[
			Validators.required,
			Validators.minLength(5)
		]),
		email: new FormControl('',[
			Validators.required,
			Validators.email
		]),
		password: new FormControl('',[
			Validators.required,
			Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
			Validators.minLength(6)
		]),
		confirmPassword: new FormControl('',[
			Validators.required,
		])
	},
	{	
		validators : signupValidators.MustMatch
	})

	get username(){ return this.signupForm.get('username') }

	get email(){ return this.signupForm.get('email') }

	get password(){ return this.signupForm.get('password') }

	get confirmPassword(){ return this.signupForm.get('confirmPassword') }

	signupdata(signupForm){
		this.signupService.saveUserDetails(signupForm.value)
		.subscribe(res =>{
			console.log(res)
		},(error)=>{
			console.log(error)
			this.signupError = error._body
			console.log(this.signupError)
		})
	}
}
