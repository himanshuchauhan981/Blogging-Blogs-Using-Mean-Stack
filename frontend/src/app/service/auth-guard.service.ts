import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	isTrue: boolean = false

	currentUser: string

	constructor(private loginService: LoginService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		this.loginService.validateJWTToken()
			.subscribe((res) => {
				let status = res.json().status
				if (status === 401) {
					this.loginService.loginObservable.next(false)
					this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
					this.isTrue = false
				}
				else if (status === 200) {
					this.loginService.loginObservable.next(true)
					this.isTrue = true
					this.router.navigate([state.url])
					this.currentUser = res.json().user.username
				}
			}, error => {
				this.router.navigate(['login'])
				this.isTrue = false
				this.loginService.loginObservable.next(false)
			})
		return this.isTrue
	}
}
