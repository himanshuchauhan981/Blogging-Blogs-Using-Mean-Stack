import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'


import { ProfileDialogBoxComponent } from './profile-dialog-box/profile-dialog-box.component'
import { ProfileService } from '../service/profile.service'

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user  = { }

	constructor(
		public matDialog: MatDialog,
		private profileService: ProfileService,
	) { }

	ngOnInit(){
		this.profileService.getUserProfileData()
		.subscribe((res)=>{
			if(res.json().status === 200){
				// console.log(res.json())
				this.user = res.json().data[0]
				console.log(this.user)
			}
		})
	}

	openDialogBox(heading){
		this.matDialog.open(ProfileDialogBoxComponent, {
			width: '350px',
			data : { heading: heading }
		})
	}

}
