import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService } from '../../service/login.service'
import { AuthGuardService } from '../../service/auth-guard.service'

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

	constructor(private loginService : LoginService, private router : Router, private authGuardService: AuthGuardService) { }

	loginStatus : Boolean = false

	public isMenuCollapsed = true

	logout(){
		this.loginService.logout()
		this.router.navigate(['login'])
	}
	
	ngOnInit(){
		this.loginService.loginObservable.subscribe(value =>{
			this.loginStatus = value
		})
	}

	showUserPosts(){
		let currentUser = this.authGuardService.currentUser
		this.router.navigate([`${currentUser}/posts`])
	}
}
