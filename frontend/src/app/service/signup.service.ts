import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Subject } from 'rxjs'

import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class SignupService {
	private basicUrl : string = environment.basicUrl

	constructor(private http : Http) { }

	public signUpObservable = new Subject<Boolean>() 

	saveUserDetails = (object) => {
		return this.http.post(`${this.basicUrl}/api/signup`, object)
	}

	setSignUpObservable(value){
		this.signUpObservable.next(value)
	}

	saveProfilePhoto(formData){
		return this.http.post(`${this.basicUrl}/api/signup/image`,formData)
	}
}
