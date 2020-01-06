import { Component } from '@angular/core';

@Component({
	selector: 'profile-photo-form',
	templateUrl: './profile-photo-form.component.html',
	styleUrls: ['./profile-photo-form.component.css']
})
export class ProfilePhotoFormComponent {

	constructor() { }

	uploadedFiles: Array<File>

	fileType: Array<String> = ['image/jpeg', 'image/jpg', 'image/png']

	uploadFileText: String = 'Upload Profile Pic'

	fileUploadColor: String = "accent"

	defaultImgSrc: string = 'https://i.stack.imgur.com/X9JD4.png?s=136&g=1'

	fileChange(element) {
		console.log(element.target.files)
		let filetype = element.target.files[0].type
		if (this.fileType.indexOf(filetype) >= 0) {
			var reader = new FileReader();

			reader.onload = (event: any) => {
				this.defaultImgSrc = event.target.result;
			}

			reader.readAsDataURL(element.target.files[0]);

			this.uploadedFiles = element.target.files
			this.uploadFileText = "File Uploaded"
			this.fileUploadColor = "primary"
		}
		else {
			this.uploadFileText = "Invalid File"
			this.fileUploadColor = "warn"
		}

	}

	uploadFile() {
		document.getElementById('upload').click()
	}
}
