import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, NavigationExtras } from '@angular/router'

import { LoginService } from '../service/login.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	passwordType: string = "password"
	passwordShown: boolean = false
	loginError: string = null

	hide = true

	constructor(private loginService : LoginService, private router: Router){}

	loginForm = new FormGroup({
		username : new FormControl('',Validators.required),
		password : new FormControl('',Validators.required)
	})

	get username() { return this.loginForm.get('username') }

	get password() { return this.loginForm.get('password') }

	
}
