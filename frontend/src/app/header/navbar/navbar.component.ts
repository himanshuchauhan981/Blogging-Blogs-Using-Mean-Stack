import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService } from '../../service/login.service'

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	constructor(private loginService : LoginService, private router : Router) { }

	logout(){
		this.loginService.logout()
		this.router.navigate(['login'])
	}

}
