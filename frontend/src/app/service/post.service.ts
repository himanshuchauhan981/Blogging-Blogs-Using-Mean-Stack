import { Injectable,Inject } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Router} from '@angular/router'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'

import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class PostService {

	private basicUrl : string = environment.basicUrl

	token: string

	url: string

	imageUrl : any = 'http://textiletrends.in/gallery/1547020644No_Image_Available.jpg'

	constructor(
		private http: Http,
		@Inject(SESSION_STORAGE) private storage: WebStorageService,
		private router: Router
	){ 
		this.url = this.router.url
	}

	fileType: Array <String> = ['image/jpeg','image/jpg','image/png']

	post = (formData) =>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.post(`${this.basicUrl}/api/post`,formData,{
			headers: headers
		})	
	}

	getAllPost = (skipPostsLimit)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`${this.basicUrl}/api/post`,{
			headers: headers,
			params: {
				skipPostsLimit: skipPostsLimit
			}
		})
	}

	getParticularPost = (id)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`${this.basicUrl}/api/post/${id}`,{
			headers: headers
		})
	}

	getAllParticularUserPost = (username)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.get(`${this.basicUrl}/api/${username}/posts`,{
			headers: headers
		})
	}

	delete = (postId) =>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization', `Bearer ${this.token}`)

		return this.http.delete(`${this.basicUrl}/api/post/${postId}`,{
			headers: headers
		})
	}

	edit = (username,postId,postData)=>{
		this.token = this.storage.get('token')

		let headers = new Headers()
		headers.append('Authorization',`Bearer ${this.token}`)

		return this.http.patch(`${this.basicUrl}/api/${username}/${postId}`,postData,{
			headers: headers
		})
	}
}

export interface Blogs{
	_id: string,
	postTitle: string,
	postContent: string,
	postImageId: string,
	postDate: Date
}