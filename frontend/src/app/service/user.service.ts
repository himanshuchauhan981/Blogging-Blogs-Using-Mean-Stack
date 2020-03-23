import { Injectable, Inject } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'
import { Subject } from 'rxjs'

import {environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basicUrl : string = environment.basicUrl

  public signUpObservable = new Subject<Boolean>()

  public token : string

	public titleObservable = new Subject<string>()

	public loginObservable = new Subject<Boolean>()

  constructor(
    private http: Http,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  saveUser = (userDetails)=>{
    return this.http.post(`${this.basicUrl}/api/signup`, userDetails)
  }

  setSignUpObservable = (value)=>{
		this.signUpObservable.next(value)
  }
  
  saveProfilePhoto = (imageDetails)=>{
    return this.http.post(`${this.basicUrl}/api/signup/image`, imageDetails)
  }

  login = (object) =>{
		return this.http.post(`${this.basicUrl}/api/login`,object)
  }
  
  storeJWTToken  = (token:string) =>{
		this.storage.set('token',token)
		this.loginObservable.next(true)
  }
  
  validateJWTToken = () =>{
		this.token = this.storage.get('token')

		let options = new RequestOptions()
		options.headers = new Headers()
		options.headers.append('Content-Type', 'application/json')
		options.headers.append('Authorization', `Bearer ${this.token}`)
		
		return this.http.post(`${this.basicUrl}/api/token`,null,options)
  }
  
  logout = () =>{
		this.storage.remove('token')
		this.loginObservable.next(false)
  }
  
  appendHeaders = () =>{
    this.token = this.storage.get('token')

    let headers = new Headers()
    headers.append('Authorization', `Bearer ${this.token}`)
    
    return headers
  }
}
