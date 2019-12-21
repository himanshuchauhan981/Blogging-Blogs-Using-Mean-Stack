import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	isTrue: boolean  = false

	constructor(private loginService: LoginService, private router: Router) { }

	canActivate(route,state:RouterStateSnapshot) {
		
		this.loginService.validateJWTToken()
			.subscribe((res) => {
				let status = res.json().status
				if (status === 401) {
					this.loginService.loginObservable.next(false)
					this.router.navigate(['login'],{queryParams: { returnUrl: state.url}})
					this.isTrue  = false
				}
				else if(status === 200){
					this.loginService.loginObservable.next(true)
					this.isTrue = true
				}
			},error =>{
				this.router.navigate(['login'])
				this.isTrue  = false
				this.loginService.loginObservable.next(false)
			})
		return this.isTrue
	}
}
