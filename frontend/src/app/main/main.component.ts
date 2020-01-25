import { Component, OnInit } from '@angular/core'
import { LoginService } from '../service/login.service'

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	constructor(private loginService: LoginService) { }

	ngOnInit() {
		this.loginService.titleObservable.next('Blogging Blogs')
	}

}
