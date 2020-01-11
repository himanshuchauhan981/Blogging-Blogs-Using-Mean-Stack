import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { PostService } from 'src/app/service/post.service'

@Component({
	selector: 'app-edit-post',
	templateUrl: './edit-post.component.html',
	styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

	post:any = {}

	constructor(
		private activatedRoute: ActivatedRoute,
		private postService: PostService
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
				}
			})
	}

	editPost(editPostForm){
		let params = this.activatedRoute.snapshot.params
		this.postService.editPost(params.username,params.postId,editPostForm.value)
			.subscribe(res=>{
				if(res.json().status === 200){
					console.log(res.json())
				}
			})
	}

}
