import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData{
	heading: string

}

@Component({
	selector: 'profile-dialog-box',
	templateUrl: './profile-dialog-box.component.html',
	styleUrls: ['./profile-dialog-box.component.css']
})
export class ProfileDialogBoxComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ProfileDialogBoxComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) { }

	ngOnInit() {
	}

	closeDialogBox(): void{
		this.dialogRef.close()
	}

}