import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'

import { PostService } from 'src/app/service/post.service'

@Component({
	selector: 'post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	constructor(
		private postService: PostService,
		private matSnackBar: MatSnackBar,
		private activatedRoute: ActivatedRoute
	) { }

	heading: string

	uploadedFiles: Array<File>

	uploadFileText: String = 'Upload File'

	fileUploadColor: String = "accent"

	msg: string

	post: any = {}

	ngOnInit() {
		let url = this.postService.url

		if (url.endsWith('/new')) this.heading = 'Create New Post'
		else this.showPost()
	}

	postForm = new FormGroup({
		postTitle: new FormControl('', Validators.required),
		postContent: new FormControl('', Validators.required),
		postImage: new FormControl('', Validators.required)
	})

	fileChange(element) {
		let filetype = element.target.files[0].type
		
		if (this.postService.url.endsWith('/new')) {
			if (this.postService.fileType.indexOf(filetype) >= 0) {
				this.uploadedFiles = element.target.files
				this.uploadFileText = "File Uploaded"
				this.fileUploadColor = "primary"
			}
			else {
				this.uploadFileText = "Invalid File"
				this.fileUploadColor = "warn"
			}
		}
		else {
			let reader = new FileReader()
			if (this.postService.fileType.indexOf(filetype) >= 0) {
				this.uploadedFiles = element.target.files

				reader.readAsDataURL(element.target.files[0])
				reader.onload = (event: any) => {
					this.postService.imageUrl = event.target.result;
				}
			}
		}

	}

	submit(postValues) {
		let formData = new FormData()
		if (this.uploadedFiles != undefined) {
			for (var i = 0; i < this.uploadedFiles.length; i++) {
				formData.append("postImage", this.uploadedFiles[i], this.uploadedFiles[i].name)
			}
		}

		formData.append("postTitle", postValues.postTitle)
		formData.append("postContent", postValues.postContent)

		if (this.postService.url.endsWith('/new')) {
			this.postService.post(formData)
				.subscribe((res) => {
					if (res.json().status === 200) {
						this.msg = res.json().msg
					}
					else if (res.json().status === 400) {
						this.msg = "Something wrong happened, Try again!!!"

					}
					this.matSnackBar.open(this.msg, 'Close', {
						duration: 8000
					})
				})
		}
		else {
			let params = this.activatedRoute.snapshot.params
			this.postService.edit(params.username, params.postId, formData)
				.subscribe(res => {
					let msg = res.json().msg
					this.matSnackBar.open(msg, 'Close', {
						duration: 8000
					})
				})
		}

	}

	showPost() {
		this.heading = 'Update Post'
		let postId = this.activatedRoute.snapshot.params.postId
		this.postService.getParticularPost(postId)
			.subscribe(res => {
				if (res.json().status === 200) {
					this.post = res.json().post
					this.postForm.controls['postTitle'].setValue(this.post.postTitle)
					this.postForm.controls['postContent'].setValue(this.post.postContent)
					this.postService.imageUrl = `/api/image/${this.post.postImage}`
				}
			})
	}

	uploadFile() {
		document.getElementById('upload').click()
	}

}
