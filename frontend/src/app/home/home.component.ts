import { Component, OnInit } from '@angular/core'
import { PostService } from '../service/post.service'
import { Router } from '@angular/router'

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private postService: PostService, private router: Router) { }

	blogArray : Array<{ _id: string, postTitle: string, postContent: string, postImageId: string, postDate: Date}>

	ngOnInit() {
		this.postService.getAllPost()
		.subscribe((res)=>{
			if(res.json().status === 200){
				this.blogArray = res.json().blogs
			}
		})
	}
}
