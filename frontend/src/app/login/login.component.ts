import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	passwordType: string = "password"
	passwordShown: boolean = false

	loginForm = new FormGroup({
		username : new FormControl('',Validators.required),
		password : new FormControl('',Validators.required)
	})

	get username() { return this.loginForm.get('username') }

	get password() { return this.loginForm.get('password') }

	public togglePassword(){
		if(this.passwordShown){
			this.passwordShown = false
			this.passwordType = 'password'
		}
		else{
			this.passwordShown = true
			this.passwordType = 'text'
		}
	}
}
