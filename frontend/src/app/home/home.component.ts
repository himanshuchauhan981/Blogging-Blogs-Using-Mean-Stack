import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService } from '../service/login.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	username: string

	constructor(private loginService: LoginService, private router: Router) { }

	ngOnInit() {
		this.loginService.getUsernameFromToken()
			.subscribe((res) => {
				let status = res.json().status
				if (status === 401) {
					this.router.navigate(['login'])
				}
				else if (status === 200) {
					this.username = res.json().user.username
				}
			}, error => {
				this.router.navigate(['login'])
			})
	}
}
