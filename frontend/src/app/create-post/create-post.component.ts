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
		console.log(element.target.files)
		this.uploadedFiles = element.target.files
	}

	createNewPost(createPostForm){
		let formData = new FormData()
		if(this.uploadedFiles != undefined){
			for(var i=0;i< this.uploadedFiles.length; i++){
				formData.append("postImage",this.uploadedFiles[i],this.uploadedFiles[i].name)
			}
			formData.append("postTitle",createPostForm.value.postTitle)
			formData.append("postContent",createPostForm.value.postContent)
		}
		this.postService.submitPost(formData)	
	}

	uploadFile(){
		document.getElementById('upload').click()
	}


}
