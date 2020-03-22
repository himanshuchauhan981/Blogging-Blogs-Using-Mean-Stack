import { Component, OnInit } from '@angular/core'
import { UserService } from '../service/user.service'

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.titleObservable.next('Blogging Blogs')
	}

}
