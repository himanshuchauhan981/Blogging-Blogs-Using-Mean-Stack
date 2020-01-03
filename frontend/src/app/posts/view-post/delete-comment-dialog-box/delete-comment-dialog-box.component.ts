import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'delete-comment-dialog-box',
	templateUrl: './delete-comment-dialog-box.component.html',
	styleUrls: ['./delete-comment-dialog-box.component.css']
})
export class DeleteCommentDialogBoxComponent {

	constructor(public dialogRef: MatDialogRef<DeleteCommentDialogBoxComponent>) { }

	closeDialogBox(){
		this.dialogRef.close();
	}

}