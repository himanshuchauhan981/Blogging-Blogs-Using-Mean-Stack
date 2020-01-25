import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { PostService } from '../service/post.service'
import { ProfileService } from '../service/profile.service'
import { LoginService } from '../service/login.service'

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private postService: PostService,
		private profileService: ProfileService,
		private loginService: LoginService,
		private router: Router
	) { }

	skipPostLimit: number = 0

	blogArray: Array<{ _id: string, postTitle: string, postContent: string, postImageId: string, postDate: Date }> = []

	ngOnInit() {
		this.postService.getAllPost(this.skipPostLimit)
			.subscribe((res) => {
				if (res.json().status === 200) {
					let resData = res.json()
					let len = resData.blogs.length
					for (let i = 0; i < len; i++) {
						this.blogArray.push(resData.blogs[i])
					}
					this.skipPostLimit = this.skipPostLimit + 2
				}
			})
		
		this.loginService.titleObservable.next('Home - Blogging Blogs')
	}

	onScroll() {
		this.postService.getAllPost(this.skipPostLimit)
			.subscribe((res) => {
				if (res.json().status === 200) {
					let resData = res.json()
					let len = resData.blogs.length
					for (let i = 0; i < len; i++) {
						this.blogArray.push(resData.blogs[i])
					}
					this.skipPostLimit = this.skipPostLimit + 2
				}
			})
	}

	openOtherUserProfilePage(id) {
		this.profileService.getOtherUserProfileUsername(id)
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.router.navigate([`/profile/${res.json().data.username}`])
			}
		})
	}
}
