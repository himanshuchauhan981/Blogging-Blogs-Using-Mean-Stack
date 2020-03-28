import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

import { PostService, Blogs } from '../../service/post.service'
import { CommentService,Comment } from '../../service/comment.service'
import { DeleteCommentDialogBoxComponent } from '../../dialog-box/delete-comment-dialog-box/delete-comment-dialog-box.component'
import { ProfileService } from 'src/app/service/profile.service'
import { LikeService } from 'src/app/service/like.service'
import { environment } from   '../../../environments/environment'

@Component({
	selector: 'app-view-post',
	templateUrl: './view-post.component.html',
	styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

	post : Blogs

	commentCount : number = 0

	clearComment = ''

	isCommentEdited: Boolean = false

	likeState: Boolean = false

	userImage: String

	commentsArray: Array<Comment>

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
		comment: new FormControl('', Validators.required)
	})


	submit(commentForm, postId) {
		this.commentService.post(commentForm.value, postId)
			.subscribe((res:any) => {
				if (res.json().status === 400) {
					this.matSnackBar.open(res.json().msg, 'Close', {
						duration: 8000
					})
				}
				else if (res.json().status === 200) {
					this.commentsArray = res.json().data
					this.commentCount = res.json().length
					this.clearComment = null
				}
			})
	}

	ngOnInit() {
		let postID = this.activatedRoute.snapshot.params.id
		let editPost = false
		this.postService.particularPost(postID,editPost)
			.subscribe((res:any) => {
				this.likeState = res.likeStatus
				let post = res.post
				if(post.postImage != null){
					post.postImage = `${environment.basicUrl}/api/image/${post.postImage}`
				}
				this.commentCount = res.commentCount
				this.post = post
				if(res.post.user[0].profileImage != null){
					this.userImage = res.post.user[0].profileImage
				}
				else this.userImage = this.profileService.defaultProfileImage			
			})

		this.commentService.getEmittedComment()
			.subscribe(data => {
				let index = this.commentsArray.findIndex(p => p._id == data._id)
				this.commentsArray.splice(index, 1)
				this.commentCount = this.commentCount - 1
			})
	}

	postComments(postId) {
		this.commentService.get(postId)
			.subscribe((res:any) => {
				this.commentsArray = res
			})
	}

	dialogBox(commentId) {
		this.matDialog.open(DeleteCommentDialogBoxComponent, {
			width: '450px',
			data: { id: commentId }
		})
	}

	userProfile(userId) {
		this.profileService.username(userId)
		.subscribe((res:any) => {
			this.router.navigate([`/profile/${res.username}`])
		})
	}

	postLike(postId) {
		this.likeService.post(postId)
		.subscribe((res:boolean) => {
			this.likeState = res
		})
	}
}
