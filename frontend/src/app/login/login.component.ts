import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router'

import { LoginService } from '../service/login.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	loginError: string = null

	hidePassword = true

	constructor(private loginService : LoginService, private router: Router, private route: ActivatedRoute){}

	loginForm = new FormGroup({
		username : new FormControl('',Validators.required),
		password : new FormControl('',Validators.required)
	})

	get username() { return this.loginForm.get('username') }

	get password() { return this.loginForm.get('password') }

	loginUser(loginForm){
		this.loginService.loginExistingUser(loginForm.value)
		.subscribe((res)=>{
			if(res.json().status === 401){
				this.loginError = res.json().msg
			}
			else if(res.json().status === 200){
				// const navigationExtra : NavigationExtras = { state: {token: res.json().token}}

				let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl')
				this.loginService.storeJWTToken(res.json().token)
				this.router.navigate([returnUrl || 'home'])
			}			
		},(error)=>{
			
		})
	}

	
}
