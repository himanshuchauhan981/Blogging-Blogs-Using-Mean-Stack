import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

import { PostService } from '../../service/post.service'

@Component({
	selector: 'view-all-posts',
	templateUrl: './view-all-posts.component.html',
	styleUrls: ['./view-all-posts.component.css']
})
export class ViewAllPostsComponent implements OnInit {

	userPost: Array<{ _id: string, postTitle: string, postContent: string, postImageId: string, postDate: Date }> = []

	authenticated: Boolean

	userProfileImage: string

	constructor(
		private postService: PostService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private matSnackBar: MatSnackBar
	) { }

	ngOnInit() {
		let username = this.activatedRoute.snapshot.params.id
		this.postService.getAllParticularUserPost(username)
			.subscribe((res) => {
				if (res.json().status === 200) {
					this.authenticated = res.json().authenticated
					this.userPost = res.json().postData
					console.log(this.userPost)
				}
			})
	}

	editPost(postAuthor, postId) {
		this.router.navigate([`/${postAuthor}/${postId}`])
	}

	deletePost(post) {
		this.postService.deleteParticularPost(post._id)
			.subscribe((res) => {
				if (res.json().status === 200) {
					let index = this.userPost.indexOf(post)
					this.userPost.splice(index, 1)
				}
				this.matSnackBar.open(res.json().msg, 'Close', {
					duration: 8000
				})
			})
	}

	viewPost(postId){
		
	}

}
