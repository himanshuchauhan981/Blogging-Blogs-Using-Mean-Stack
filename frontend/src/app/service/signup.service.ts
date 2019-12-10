import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable({
	providedIn: 'root'
})
export class SignupService {

	constructor(private http : Http) { }

	saveUserDetails = (object) => {
		return this.http.post('/api/signup', object)
	}
}
