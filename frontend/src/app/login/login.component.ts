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

	constructor(private loginService : LoginService, private router: Router){}

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

	loginUser(loginForm){
		this.loginService.loginExistingUser(loginForm.value)
		.subscribe((res)=>{
			if(res.json().status === 401){
				this.loginError = res.json().msg
			}
			else if(res.json().status === 200){
				// const navigationExtra : NavigationExtras = { state: {token: res.json().token}}
				this.loginService.storeJWTToken(res.json().token)
				this.router.navigate(['home'])
			}			
		},(error)=>{
			
		})
	}
}
