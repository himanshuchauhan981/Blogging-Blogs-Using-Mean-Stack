import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { signupValidators } from './signup.validators'
import { SignupService } from '../../service/signup.service';

@Component({
	selector: 'signup-form',
	templateUrl: './signup-form.component.html',
	styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

	signupError: string = null

	@Output() idEmitter = new EventEmitter()

	constructor(private signupService: SignupService, private router: Router) { }

	signupForm = new FormGroup({
		firstName: new FormControl('', [
			Validators.required
		]),
		lastName: new FormControl('', [
			Validators.required
		]),
		username: new FormControl('', [
			Validators.required,
			Validators.minLength(5)
		]),
		email: new FormControl('', [
			Validators.required,
			Validators.email
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
			Validators.minLength(6)
		]),
		confirmPassword: new FormControl('', [
			Validators.required,
		])
	},
		{
			validators: signupValidators.MustMatch
		})

	get firstName() { return this.signupForm.get('firstName') }

	get lastName() { return this.signupForm.get('lastName') }

	get username() { return this.signupForm.get('username') }

	get email() { return this.signupForm.get('email') }

	get password() { return this.signupForm.get('password') }

	get confirmPassword() { return this.signupForm.get('confirmPassword') }

	signupdata(signupForm) {
		this.signupService.saveUserDetails(signupForm.value)
			.subscribe(res => {
				if(res.json().status === 200){
					this.signupService.signUpObservable.next(true)
					this.idEmitter.emit(res.json().data)
				}
			}, (error) => {
				this.signupService.signUpObservable.next(false)
				this.signupError = error._body
			})
	}
}
