import { Component, OnInit } from '@angular/core'

import { PostService, Blogs } from '../service/post.service'
import { ProfileService } from '../service/profile.service'
import { environment } from '../../environments/environment'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private postService: PostService,
		private profileService: ProfileService,
		private titleService: Title
	) { }

	pageSize : number  = 3

	pageIndex : number  = 0

	blogArray: Array<Blogs> = []

	topBlogs : Array<Blogs> = []

	ngOnInit() {
		this.postService.allPosts(this.pageIndex, this.pageSize)
			.subscribe((res:any) => {
				let resData = res
				let len = resData.blogs.length
				for (let i = 0; i < len; i++) {
					if(resData.blogs[i].userImage != null){
						let imageUrl = `${environment.basicUrl}/api/user/image/${resData.blogs[i].userId}`
						resData.blogs[i].userImage = imageUrl
					}
					else if(resData.blogs[i].postImage != null){
						let imageUrl = `${environment.basicUrl}/api/image/${resData.blogs[i].postImage}`
						resData.blogs[i].postImage = imageUrl
					}
					this.blogArray.push(resData.blogs[i])
				}
			})
		
		this.titleService.setTitle('Home - Blogging Blogs')
		this.profileService.prepareProfileNames()

		this.postService.topPosts()
		.subscribe((res:any) =>{
			let resData = res.topBlogs
			for(let i=0; i< resData.length; i++){
				if(resData[i].postImage != null){
					let imageUrl = `${environment.basicUrl}/api/image/${resData[i].postImage}`
					resData[i].postImage = imageUrl
				}
			}
			this.topBlogs = resData
			console.log(this.topBlogs[0])
		})
	}

	onScroll() {
		this.pageIndex = this.pageIndex + 1
		this.postService.allPosts(this.pageIndex, this.pageSize)
			.subscribe((res:any) => {
				let resData = res
				let len = resData.blogs.length
				for (let i = 0; i < len; i++) {
					this.blogArray.push(resData.blogs[i])
				}
			})
	}

	profilePage(id) {
		this.profileService.redirectToProfilePage(id)
	}
}
