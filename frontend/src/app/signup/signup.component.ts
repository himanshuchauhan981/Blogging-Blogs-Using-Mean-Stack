import { Component,OnInit, ViewChild, AfterViewInit, Output, OnDestroy, OnChanges } from '@angular/core'

import { SignupService } from '../service/signup.service'
import { SignupFormComponent } from './signup-form/signup-form.component'
import { EventEmitter } from 'events'

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

	@ViewChild(SignupFormComponent,{static: false}) child

	signUpSuccess : Boolean

	constructor(private signupService: SignupService){ }

	id: string
	
	ngOnInit(){
		this.signupService.signUpObservable.subscribe(value =>{
			this.signUpSuccess = value
		})	
	}

	itemSelected(e){
		this.id = e
	}

}
