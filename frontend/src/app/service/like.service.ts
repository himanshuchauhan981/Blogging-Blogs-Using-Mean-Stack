import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class LikeService {
  private basicUrl: string = environment.basicUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  post(postId) {
    let headers = this.userService.appendHeaders();

    return this.http.post(`${this.basicUrl}/api/${postId}/like`, null, {
      headers: headers,
    });
  }
}
