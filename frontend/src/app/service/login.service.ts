import { Injectable, Inject } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	token: string

	options

	public loginObservable = new Subject<Boolean>()

	constructor(private http : Http, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
		this.token = this.storage.get('token')
		this.options = new RequestOptions()
		this.options.headers = new Headers()
		this.options.headers.append('Content-Type', 'application/json')
		this.options.headers.append('Authorization', `Bearer ${this.token}`)
	}

	loginExistingUser = (object) =>{
		return this.http.post('/api/login',object)
	}

	storeJWTToken  = (token) =>{
		this.storage.set('token',token)
		this.loginObservable.next(true)
	}

	validateJWTToken = () =>{
		return this.http.post('/api/token',null,this.options)
	}

	logout = () =>{
		this.storage.remove('token')
		this.loginObservable.next(false)
	}
}
