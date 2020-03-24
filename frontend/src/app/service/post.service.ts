import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserService } from './user.service'

import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class PostService {

	private basicUrl : string = environment.basicUrl

	msg: string

	imageUrl : string = 'http://textiletrends.in/gallery/1547020644No_Image_Available.jpg'
	
	constructor(
		private http: Http,
		private matSnackBar: MatSnackBar,
		private userService: UserService
	){ }

	fileType: Array <String> = ['image/jpeg','image/jpg','image/png']

	post = (formData) =>{
		let headers = this.userService.appendHeaders()

		this.http.post(`${this.basicUrl}/api/post`,formData,{
			headers: headers
		})
		.subscribe((res) => {
			if (res.json().status === 200) {
				this.msg = res.json().msg
			}
			else if (res.json().status === 400) {
				this.msg = "Something wrong happened, Try again!!!"

			}
			this.matSnackBar.open(this.msg, 'Close', {
				duration: 8000
			})
		})
	}

	allPosts = (pageIndex, pageSize)=>{
		let headers = this.userService.appendHeaders()

		return this.http.get(`${this.basicUrl}/api/post`,{
			headers: headers,
			params: {
				pageIndex: pageIndex,
				pageSize:  pageSize
			}
		})
	}

	particularPost = (id)=>{
		let headers = this.userService.appendHeaders()

		return this.http.get(`${this.basicUrl}/api/post/${id}`,{
			headers: headers
		})
	}

	userPosts = (username)=>{
		let headers = this.userService.appendHeaders()

		return this.http.get(`${this.basicUrl}/api/${username}/posts`,{
			headers: headers
		})
	}

	delete = (postId) =>{
		let headers = this.userService.appendHeaders()

		return this.http.delete(`${this.basicUrl}/api/post/${postId}`,{
			headers: headers
		})
	}

	edit = (username,postId,postData)=>{
		let headers = this.userService.appendHeaders()

		this.http.patch(`${this.basicUrl}/api/${username}/${postId}`,postData,{
			headers: headers
		})
		.subscribe(res => {
			let msg = res.json().msg
			this.matSnackBar.open(msg, 'Close', {
				duration: 8000
			})
		})
	}
}

export interface Blogs{
	_id: string,
	postTitle: string,
	postContent: string,
	postImage: string,
	postDate: Date,
	userId: string,
	lastModifiedAt: string,
	postAuthor: string
}
