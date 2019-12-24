import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { PostService } from '../service/post.service'

@Component({
	selector: 'create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

	uploadedFiles : Array <File>

	fileType: Array <String> = ['image/jpeg','image/jpg','image/png']

	uploadFileText: String = 'Upload File'

	fileUploadColor : String ="accent"

	constructor(private postService: PostService) { }

	createPostForm = new FormGroup({
		postTitle: new FormControl('',[
			Validators.required
		]),
		postContent: new FormControl('',[
			Validators.required
		]),
		postImage : new FormControl('',[
			Validators.required
		])
	})

	get postTitle(){ return this.createPostForm.get('postTitle')}

	get postContent(){ return this.createPostForm.get('postContent')}

	fileChange(element){
		let filetype = element.target.files[0].type
		if(this.fileType.indexOf(filetype)  >= 0){
			this.uploadedFiles = element.target.files
			this.uploadFileText = "File Uploaded"
			this.fileUploadColor = "primary"
		}
		else{
			this.uploadFileText = "Invalid File"
			this.fileUploadColor = "warn"
		}
		
	}

	submitNewPost(createPostForm){
		let formData = new FormData()
		if(this.uploadedFiles != undefined){
			for(var i=0;i< this.uploadedFiles.length; i++){
				formData.append("postImage",this.uploadedFiles[i],this.uploadedFiles[i].name)
			}
		}
		formData.append("postTitle",createPostForm.value.postTitle)
		formData.append("postContent",createPostForm.value.postContent)
		this.postService.submitPost(formData)
		.subscribe((res)=>{
			console.log(res)
		})
	}

	// createNewPost(createPostForm){
		
	// }

	uploadFile(){
		document.getElementById('upload').click()
	}


}
