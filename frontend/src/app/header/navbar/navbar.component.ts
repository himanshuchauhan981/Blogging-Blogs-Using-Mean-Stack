import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService } from '../../service/login.service'
import { AuthGuardService } from '../../service/auth-guard.service'
import { ProfileService } from 'src/app/service/profile.service'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

	constructor(
		private loginService: LoginService,
		private profileService: ProfileService,
		private router: Router,
		private authGuardService: AuthGuardService
	) { }

	loginStatus : Boolean = false

	public isMenuCollapsed = true

	public username

	userList = []

	defaultUserList = []

	capitalizaFirstAndLastName(fullName){
		return fullName.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
	}

	logout(){
		this.loginService.logout()
		this.router.navigate(['login'])
	}

	ngOnInit(){
		this.loginService.loginObservable.subscribe(value =>{
			this.loginStatus = value
			this.username = this.authGuardService.currentUser
		})

		this.profileService.getAllProfileName()
			.subscribe(res =>{
				let data = res.json().data
				data.forEach((data)=>{
					let fullName = this.capitalizaFirstAndLastName(data.fullName)
					data.fullName = fullName
				})
				this.defaultUserList = data.map((obj)=>{
					return obj.fullName
				})
			})		
	}

	searchUsers(event){
		console.log(event.length)
	}
}
