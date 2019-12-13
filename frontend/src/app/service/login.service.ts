import { Injectable, Inject } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	token: string

	constructor(private http : Http,@Inject(SESSION_STORAGE) private storage: WebStorageService) { }

	loginExistingUser = (object) =>{
		return this.http.post('/api/login',object)
	}

	storeJWTToken  = (token) =>{
		this.storage.set('token',token)
	}

	getUsernameFromToken = () =>{
		this.token = this.storage.get('token')

		//Setting Headers
		let options = new RequestOptions()
		options.headers = new Headers()
		options.headers.append('Content-Type', 'application/json')
		options.headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.post('/api/token',null,options)
	}
}
