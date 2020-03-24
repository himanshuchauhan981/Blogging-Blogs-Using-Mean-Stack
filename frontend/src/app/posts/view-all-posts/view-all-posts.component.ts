import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

import { PostService, Blogs } from '../../service/post.service'
import { ProfileService } from 'src/app/service/profile.service'
import { environment } from '../../../environments/environment'

@Component({
	selector: 'view-all-posts',
	templateUrl: './view-all-posts.component.html',
	styleUrls: ['./view-all-posts.component.css']
})
export class ViewAllPostsComponent implements OnInit {

	userPost: Array<Blogs> = []

	authenticated: Boolean

	basicUrl : string = environment.basicUrl

	constructor(
		private postService: PostService,
		private profileService: ProfileService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private matSnackBar: MatSnackBar
	) { }

	ngOnInit() {
		let username = this.activatedRoute.snapshot.params.id
		this.postService.userPosts(username)
			.subscribe((res:any) => {
				if (res.json().status === 200) {
					let resData = res.json().postData
					for(let i=0;i< resData.length; i++){
						if(resData.postImage != null){
							let imageUrl = `${this.basicUrl}/api/image/${resData.postImage}`
							resData.postImage = imageUrl
						}
						if(resData[i].userdata[0].profileImage != null){
							let imageUrl = `${this.basicUrl}/api/image/${resData[i].userdata[0].profileImage}`
							resData[i].userdata[0].profileImage = imageUrl
						}
						else{
							resData[i].userdata[0].profileImage = this.profileService.defaultProfileImage
						}
						this.userPost.push(resData[i])
						
					}
					this.authenticated = res.json().authenticated
				}
			})
	}

	editPost(postAuthor, postId) {
		this.router.navigate([`/${postAuthor}/${postId}/edit`])
	}

	deletePost(post) {
		this.postService.delete(post._id)
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
	
	openProfilePage(id){
		this.profileService.username(id)
			.subscribe((res)=>{
				if(res.json().status === 200){
					this.router.navigate([`/profile/${res.json().data.username}`])
				}
			})
	}

}
