import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { PostService, Blogs } from '../service/post.service'
import { ProfileService } from '../service/profile.service'
import { UserService } from '../service/user.service'
import { environment } from '../../environments/environment'

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private postService: PostService,
		private profileService: ProfileService,
		private userService: UserService,
		private router: Router
	) { }

	skipPostLimit: number = 0

	blogArray: Array<Blogs> = []

	ngOnInit() {
		this.postService.allPosts(this.skipPostLimit)
			.subscribe((res) => {
				if (res.json().status === 200) {
					let resData = res.json()
					let len = resData.blogs.length
					for (let i = 0; i < len; i++) {
						let imageUrl = `${environment.basicUrl}/api/image/${resData.blogs[i].postImage}`
						resData.blogs[i].userImage = `${environment.basicUrl}/api/user/image/${resData.blogs[i].userId}`
						resData.blogs[i].postImage = imageUrl
						this.blogArray.push(resData.blogs[i])
					}
					this.skipPostLimit = this.skipPostLimit + 2
				}
			})
		
		this.userService.titleObservable.next('Home - Blogging Blogs')
	}

	onScroll() {
		this.postService.allPosts(this.skipPostLimit)
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

	profilePage(id) {
		this.profileService.username(id)
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.router.navigate([`/profile/${res.json().data.username}`])
			}
		})
	}
}
