import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

import { ProfileDialogBoxComponent } from './profile-dialog-box/profile-dialog-box.component'

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(public matDialog: MatDialog) { }

	ngOnInit() {
	}

	openDialogBox(heading){
		this.matDialog.open(ProfileDialogBoxComponent, {
			width: '350px',
			data : { heading: heading, updateFunction:`update${heading}` }
		})
	}

}
