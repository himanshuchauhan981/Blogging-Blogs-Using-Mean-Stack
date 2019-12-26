import { Component, OnInit, OnChanges } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService } from '../../service/login.service'

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

	constructor(private loginService : LoginService, private router : Router) { }

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
}
