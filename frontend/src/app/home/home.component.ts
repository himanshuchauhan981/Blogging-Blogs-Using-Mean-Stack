import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { PostService } from '../service/post.service'
import { AuthGuardService } from '../service/auth-guard.service'

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private postService: PostService,
		private authGuardService: AuthGuardService,
		private router: Router
	) { }

	skipPostLimit : number = 0

	username : String

	blogArray : Array<{ _id: string, postTitle: string, postContent: string, postImageId: string, postDate: Date}> = []

	ngOnInit() {
		this.postService.getAllPost(this.skipPostLimit)
		.subscribe((res)=>{
			if(res.json().status === 200){
				let resData = res.json()
				let len = resData.blogs.length
				for(let i=0;i<len;i++){
					this.blogArray.push(resData.blogs[i])
				}
				this.skipPostLimit = this.skipPostLimit + 2
			}
		})
		this.username = this.authGuardService.currentUser
	}

	onScroll(){
		this.postService.getAllPost(this.skipPostLimit)
		.subscribe((res)=>{
			if(res.json().status === 200){
				let resData = res.json()
				let len = resData.blogs.length
				for(let i=0;i<len;i++){
					this.blogArray.push(resData.blogs[i])
				}
				this.skipPostLimit = this.skipPostLimit + 2
			}
		})
	}

	openProfilePage(username){
		this.router.navigate([`/profile/${username}`])
	}
}
