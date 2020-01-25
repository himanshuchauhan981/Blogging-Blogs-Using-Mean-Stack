import { Component, OnInit, ViewChild } from '@angular/core'

import { SignupService } from '../service/signup.service'
import { SignupFormComponent } from './signup-form/signup-form.component'
import { LoginService } from '../service/login.service'

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

	@ViewChild(SignupFormComponent,{static: false}) child

	signUpSuccess : Boolean

	constructor(private signupService: SignupService, private loginService: LoginService){ }

	id: string
	
	ngOnInit(){
		this.signupService.signUpObservable.subscribe(value =>{
			this.signUpSuccess = value
		})

		this.loginService.titleObservable.next('Sign Up- Blogging Blogs')
	}

	itemSelected(e){
		this.id = e
	}

}
