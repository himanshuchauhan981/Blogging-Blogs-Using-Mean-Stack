import { Component, OnInit, ViewChild } from '@angular/core'

import { SignupFormComponent } from './signup-form/signup-form.component'
import { UserService } from '../service/user.service'

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

	@ViewChild(SignupFormComponent,{static: false}) child

	signUpSuccess : Boolean

	constructor(private userService: UserService){ }

	id: string
	
	ngOnInit(){
		this.userService.signUpObservable.subscribe(value =>{
			this.signUpSuccess = value
		})

		this.userService.titleObservable.next('Sign Up- Blogging Blogs')
	}

	itemSelected(e){
		this.id = e
	}
}
