import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { PostService } from 'src/app/service/post.service'
import { environment } from '../../../environments/environment'

@Component({
	selector: 'post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	constructor(
		private postService: PostService,
		private activatedRoute: ActivatedRoute
	) { }

	heading: string

	uploadedFiles: Array<File>

	uploadFileText: String = 'Upload File'

	fileUploadColor: String = "accent"

	msg: string

	post: any = {}

	ngOnInit() {
		let url = this.activatedRoute.snapshot.routeConfig.path
		if (url == 'post/new') this.heading = 'Create New Post'
		else this.showPost()
	}

	postForm = new FormGroup({
		postTitle: new FormControl('', Validators.required),
		postContent: new FormControl('', Validators.required),
		postImage: new FormControl('', Validators.required)
	})

	fileChange(element) {
		let filetype = element.target.files[0].type
		let reader = new FileReader()

		if (this.postService.fileType.indexOf(filetype) >= 0) {
			this.uploadedFiles = element.target.files
			this.uploadFileText = "File Uploaded"
			this.fileUploadColor = "primary"
			this.uploadedFiles = element.target.files

			reader.readAsDataURL(element.target.files[0])
			reader.onload = (event: any) => {
				this.postService.imageUrl = event.target.result;
			}
		}
		else {
			this.uploadFileText = "Invalid File"
			this.fileUploadColor = "warn"
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

		let url = this.activatedRoute.snapshot.routeConfig.path
		if (url == 'post/new') {
			this.postService.post(formData)
		}
		else {
			let params = this.activatedRoute.snapshot.params
			this.postService.edit(params.username, params.postId, formData)
		}

	}

	showPost() {
		this.heading = 'Update Post'
		let postId = this.activatedRoute.snapshot.params.postId
		this.postService.particularPost(postId)
			.subscribe(res => {
				console.log(res.json())
				if (res.json().status === 200) {
					this.post = res.json().post
					this.postForm.controls['postTitle'].setValue(this.post.postTitle)
					this.postForm.controls['postContent'].setValue(this.post.postContent)
					this.postService.imageUrl = `${environment.basicUrl}/api/image/${this.post.postImage}`
				}
			})
	}

	uploadFile() {
		document.getElementById('upload').click()
	}
}
