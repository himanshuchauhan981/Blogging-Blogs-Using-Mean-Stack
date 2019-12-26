import { Injectable, Inject } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	token: string

	public loginObservable = new Subject<Boolean>()

	constructor(private http : Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

	loginExistingUser = (object) =>{
		return this.http.post('/api/login',object)
	}

	storeJWTToken  = (token) =>{
		this.storage.set('token',token)
		this.loginObservable.next(true)
	}

	validateJWTToken = () =>{
		this.token = this.storage.get('token')

		//Setting Headers
		let options = new RequestOptions()
		options.headers = new Headers()
		options.headers.append('Content-Type', 'application/json')
		options.headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.post('/api/token',null,options)
	}

	logout = () =>{
		this.storage.remove('token')
		this.loginObservable.next(false)
	}
}
