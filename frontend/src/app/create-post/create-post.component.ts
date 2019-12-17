import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

	constructor() { }

	createPostForm = new FormGroup({
		postTitle: new FormControl('',[
			Validators.required
		]),
		postContent: new FormControl('',[
			Validators.required
		]),
		postImage : new FormControl('',[
			Validators.required
		])
	})

	get postTitle(){ return this.createPostForm.get('postTitle')}

	get postContent(){ return this.createPostForm.get('postContent')}

	createNewPost(createPostForm){

	}


}
