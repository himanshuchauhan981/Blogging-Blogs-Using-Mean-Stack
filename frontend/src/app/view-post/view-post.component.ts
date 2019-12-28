import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { PostService } from '../service/post.service'
import { CommentService } from '../service/comment.service'

@Component({
	selector: 'app-view-post',
	templateUrl: './view-post.component.html',
	styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

	post = {}

	constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) { }

	commentForm = new FormGroup({
		comment: new FormControl('',Validators.required)
	})

	get comment(){ return this.commentForm.get('comment')}

	submitComment(commentForm,postId){
		this.commentService.submitNewComment(commentForm.value,postId)
		.subscribe((res)=>{
			console.log(res)
		})
	}

	@ViewChild("focusComment",{static: false}) nameField: ElementRef;
	focusCommentInput() :  void{
		this.nameField.nativeElement.focus()
	}

	ngOnInit() {
		let postID = this.activatedRoute.snapshot.params.id
		this.postService.getParticularPost(postID)
		.subscribe((res)=>{
			this.post = res.json().post
		})
	}

}
