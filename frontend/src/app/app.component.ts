import { Component, OnInit } from '@angular/core'
import * as AOS from 'aos'
import { LoginService } from './service/login.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title : string

	constructor(private loginService: LoginService){

	}

	ngOnInit() {
		AOS.init()

		this.loginService.titleObservable.subscribe(value =>{
			this.title = value
		})
	}
}
