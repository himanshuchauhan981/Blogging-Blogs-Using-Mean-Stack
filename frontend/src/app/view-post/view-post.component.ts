import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { PostService } from '../service/post.service'
import { CommentService } from '../service/comment.service'

@Component({
	selector: 'app-view-post',
	templateUrl: './view-post.component.html',
	styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

	post = {}

	commentsLength  = 0

	commentsArray : Array<{_id: string, postId: string, text: string, createdBy: string, createdAt: Date}>

	constructor(
		private activatedRoute: ActivatedRoute, 
		private postService: PostService, 
		private commentService: CommentService,
		private matSnackBar: MatSnackBar
	) { }

	commentForm = new FormGroup({
		comment: new FormControl('',Validators.required)
	})

	get comment(){ return this.commentForm.get('comment')}

	submitComment(commentForm,postId){
		this.commentService.submitNewComment(commentForm.value,postId)
		.subscribe((res)=>{
			if(res.json().status === 400){
				this.matSnackBar.open(res.json().msg,'Close',{
					duration: 8000
				})
			}
		})
	}

	ngOnInit() {
		let postID = this.activatedRoute.snapshot.params.id
		this.postService.getParticularPost(postID)
		.subscribe((res)=>{
			this.post = res.json().post
			this.commentsLength = res.json().commentLength
		})
	}

	getPostComments(postId){
		this.commentService.getParticularPostComment(postId)
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.commentsArray = res.json().comments
			}
			console.log(this.commentsArray)
		})
	}

}
