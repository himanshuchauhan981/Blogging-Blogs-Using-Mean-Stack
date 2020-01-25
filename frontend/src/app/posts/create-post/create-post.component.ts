import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { PostService } from '../../service/post.service'
import { LoginService } from 'src/app/service/login.service'

@Component({
	selector: 'create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{

	msg: string

	uploadedFiles : Array <File>

	fileType: Array <String> = ['image/jpeg','image/jpg','image/png']

	uploadFileText: String = 'Upload File'

	fileUploadColor : String ="accent"

	constructor(
		private postService: PostService,
		private loginService: LoginService,
		private matSnackBar: MatSnackBar
	) { }

	ngOnInit(){
		this.loginService.titleObservable.next('Create Post - Blogging Blogs')
	}

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
			if(res.json().status === 200){
				this.msg = res.json().msg
			}
			else if(res.json().status === 400){
				this.msg = "Something wrong happened, Try again!!!"	
				
			}
			this.matSnackBar.open(this.msg,'Close',{
				duration: 8000
			})
		})
	}

	uploadFile(){
		document.getElementById('upload').click()
	}
}
