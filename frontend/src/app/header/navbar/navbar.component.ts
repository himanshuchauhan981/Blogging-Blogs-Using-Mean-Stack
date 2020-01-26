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
	
	// searchUserForm = new FormGroup({
	// 	user: new FormControl('')
	// })

	// get user(){ return this.searchUserForm.get('user')}

	ngOnInit(){
		this.loginService.loginObservable.subscribe(value =>{
			this.loginStatus = value
			this.username = this.authGuardService.currentUser
		})

		// this.searchUserForm.get('user').valueChanges.subscribe(val =>{
		// 	this.searchUser(val)
		// })

		this.profileService.getAllProfileName()
			.subscribe(res =>{
				let data = res.json().data
				data.forEach((data)=>{
					let fullName = this.capitalizaFirstAndLastName(data.fullName)
					data.fullName = fullName
				})
				this.defaultUserList = data
			})		
	}

	// searchUser(value){
	// 	this.userList = []
	// 	this.defaultUserList.forEach(val =>{
	// 		if(val.fullName.startsWith(value) && value !=""){
	// 			this.userList.push(val)
	// 		}
	// 	})
	// }
}
