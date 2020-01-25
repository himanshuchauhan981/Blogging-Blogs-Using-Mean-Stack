import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { PostService } from '../../service/post.service'
import { $ } from 'protractor'

@Component({
	selector: 'app-edit-post',
	templateUrl: './edit-post.component.html',
	styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

	post:any = {}

	uploadedFiles : Array <File>

	fileType: Array <String> = ['image/jpeg','image/jpg','image/png']

	imageUrl : any = 'http://textiletrends.in/gallery/1547020644No_Image_Available.jpg'

	constructor(
		private activatedRoute: ActivatedRoute,
		private postService: PostService,
		private matSnackBar: MatSnackBar
	) { }

	editPostForm = new FormGroup({
		postTitle: new FormControl(this.post.postTitle),
		postContent: new FormControl('')
	})

	get postTitle(){ return this.editPostForm.get('postTitle') }

	get postContent(){ return this.editPostForm.get('postContent') }

	ngOnInit() {
		let postId = this.activatedRoute.snapshot.params.postId
		this.postService.getParticularPost(postId)
			.subscribe(res=>{
				if(res.json().status === 200){
					this.post = res.json().post
					this.editPostForm.controls['postTitle'].setValue(this.post.postTitle)
					this.editPostForm.controls['postContent'].setValue(this.post.postContent)
					this.imageUrl = `/api/image/${this.post.postImage}`
				}
			})
	}

	editPost(editPostForm){
		let formData = new FormData()

		if(this.uploadedFiles != undefined){
			for(var i=0;i< this.uploadedFiles.length; i++){
				formData.append("postImage",this.uploadedFiles[i],this.uploadedFiles[i].name)
			}
		}
		
		formData.append("postTitle",editPostForm.value.postTitle)
		formData.append("postContent",editPostForm.value.postContent)

		let params = this.activatedRoute.snapshot.params
		this.postService.editPost(params.username,params.postId,formData)
			.subscribe(res=>{
				let msg = res.json().msg
				this.matSnackBar.open(msg,'Close',{
					duration: 8000
				})
			})
	}

	fileChange(element){
		let filetype = element.target.files[0].type
		let reader = new FileReader()
		if(this.fileType.indexOf(filetype)  >= 0){
			this.uploadedFiles = element.target.files

			reader.readAsDataURL(element.target.files[0])
			reader.onload = (event:any)=>{
				this.imageUrl = event.target.result;
			}
		}
	}

	uploadFile(){
		document.getElementById('upload').click()
	}
}
