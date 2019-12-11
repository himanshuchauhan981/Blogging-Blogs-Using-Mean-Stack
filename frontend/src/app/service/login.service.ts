import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private http: Http) { }

	loginExistingUser = (object) =>{
		return this.http.post('/api/login',object)
	}
}
