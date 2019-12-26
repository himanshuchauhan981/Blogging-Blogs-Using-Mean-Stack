import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	isTrue: boolean  = false

	constructor(private loginService: LoginService, private router: Router,private activatedRoute: ActivatedRoute) { }

	canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
		
		this.loginService.validateJWTToken()
			.subscribe((res) => {
				let status = res.json().status
				if (status === 401) {
					this.loginService.loginObservable.next(false)
					this.router.navigate(['login'],{queryParams: { returnUrl: state.url}})
					this.isTrue  = false
				}
				else if(status === 200){
					// let url = route.routeConfig.path
					let url = this.activatedRoute.snapshot['_routerState'].url
					this.loginService.loginObservable.next(true)
					this.isTrue = true
					this.router.navigate([url])
				}
			},error =>{
				this.router.navigate(['login'])
				this.isTrue  = false
				this.loginService.loginObservable.next(false)
			})
		return this.isTrue
	}
}
