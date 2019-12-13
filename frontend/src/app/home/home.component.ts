import { Component, OnInit } from '@angular/core'

import { LoginService } from '../service/login.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	username : string 

	constructor(private loginService: LoginService) { }

	ngOnInit() {
		this.loginService.getUsernameFromToken()
			.subscribe((res)=>{
				this.username = res.json().user.email
			})
	}

}
