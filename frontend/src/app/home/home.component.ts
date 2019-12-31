import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { PostService } from '../service/post.service'

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private postService: PostService, private router: Router) { }

	skipPostLimit : number = 0

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
}
