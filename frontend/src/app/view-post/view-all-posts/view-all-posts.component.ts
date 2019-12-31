import { Component, OnInit } from '@angular/core'
import { Router,ActivatedRoute } from '@angular/router'

import { PostService } from '../../service/post.service'

@Component({
	selector: 'view-all-posts',
	templateUrl: './view-all-posts.component.html',
	styleUrls: ['./view-all-posts.component.css']
})
export class ViewAllPostsComponent implements OnInit {

	userPost: Array<{_id: string, postTitle: string, postContent: string, postImageId: string, postDate: Date}> = []

	constructor(
		private postService: PostService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		let username = this.activatedRoute.snapshot.params.username
		this.postService.getAllParticularUserPost(username)
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.userPost = res.json().data
			}
		})
	}

	editPost(){

	}

	deletePost(){
		
	}

}
