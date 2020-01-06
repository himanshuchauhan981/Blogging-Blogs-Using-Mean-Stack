import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class SignupService {

	constructor(private http : Http) { }

	public signUpObservable = new Subject<Boolean>() 

	saveUserDetails = (object) => {
		return this.http.post('/api/signup', object)
	}

	setSignUpObservable(value){
		this.signUpObservable.next(value)
	}

	saveProfilePhoto(formData){
		return this.http.post('/api/signup/image',formData)
	}
}
