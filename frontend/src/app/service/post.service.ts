import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	constructor(private http: Http) { }

	submitPost = (object) =>{
		console.log(object)
		return this.http.post('/api/post',object)
	}
}
