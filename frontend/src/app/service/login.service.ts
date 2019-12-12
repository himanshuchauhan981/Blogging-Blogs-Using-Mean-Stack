import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private http : Http,@Inject(SESSION_STORAGE) private storage: WebStorageService) { }

	loginExistingUser = (object) =>{
		return this.http.post('/api/login',object)
	}

	storeJWTToken  = (token) =>{
		this.storage.set('token',token)
	}
}
