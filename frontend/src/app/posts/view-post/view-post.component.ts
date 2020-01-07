import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

import { PostService } from '../../service/post.service'
import { CommentService } from '../../service/comment.service'
import { DeleteCommentDialogBoxComponent } from '../../dialog-box/delete-comment-dialog-box/delete-comment-dialog-box.component'
import { ProfileService } from 'src/app/service/profile.service'
import { LikeService } from 'src/app/service/like.service'

@Component({
	selector: 'app-view-post',
	templateUrl: './view-post.component.html',
	styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

	post = {}

	commentsLength  = 0

	clearComment = ''

	isCommentEdited : Boolean = false

	likeState : Boolean = false

	commentsArray : Array<{_id: string, postId: string, text: string, createdBy: string, createdAt: Date}>

	constructor(
		private activatedRoute: ActivatedRoute, 
		private postService: PostService, 
		private commentService: CommentService,
		private profileService: ProfileService,
		private likeService: LikeService,
		private router: Router,
		private matSnackBar: MatSnackBar,
		private matDialog: MatDialog
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
			else if(res.json().status === 200){
				this.commentsArray = res.json().data
				this.commentsLength = res.json().length
				this.clearComment = null
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

		this.commentService.getEmittedComment()
			.subscribe(data=>{
				let index = this.commentsArray.findIndex(p => p._id == data._id)
				this.commentsArray.splice(index,1)
				this.commentsLength = this.commentsLength - 1
			})
	}

	getPostComments(postId){
		this.commentService.getParticularPostComment(postId)
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.commentsArray = res.json().comments
			}
		})
	}

	openDeleteDialogBox(commentId){
		this.matDialog.open(DeleteCommentDialogBoxComponent,{
			width: '450px',
			data: { id: commentId }
		})
	}

	editComment(id,text){
		console.log(id,text)
	}

	openOtherUserProfilePage(postId) {
		this.profileService.getOtherUserProfileUsername(postId)
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.router.navigate([`/profile/${res.json().data.username}`])
			}
		})
	}

	saveOrDeletePostLike(postId){
		this.likeService.saveOrDeletePostLike(postId)
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.likeState = true
			}
			else if(res.json().status === 404){
				this.likeState = false
			}
		})
	}
}
