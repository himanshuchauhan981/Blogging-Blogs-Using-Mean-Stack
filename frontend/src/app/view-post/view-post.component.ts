import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '../service/post.service'

@Component({
	selector: 'app-view-post',
	templateUrl: './view-post.component.html',
	styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

	post = {}

	constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

	ngOnInit() {
		let postID = this.activatedRoute.snapshot.params.id
		this.postService.getParticularPost(postID)
		.subscribe((res)=>{
			this.post = res.json().post
		})
	}

}
