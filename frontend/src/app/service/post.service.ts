import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private basicUrl: string = environment.basicUrl;

  imageUrl: string;

  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {}

  fileType: Array<String> = ["image/jpeg", "image/jpg", "image/png"];

  post = (formData: FormData) => {
    let options = this.userService.multipartHeaders();

    this.http
      .post(`${this.basicUrl}/api/post`, formData, {
        headers: options,
      })
      .subscribe(
        (res: any) => {
          this.openSnackBar(200, res);
        },
        (error) => {
          this.openSnackBar(error.status, error.msg);
        }
      );
  };

  allPosts = (pageIndex, pageSize) => {
    let headers = this.userService.appendHeaders();

    return this.http.get(`${this.basicUrl}/api/post`, {
      headers: headers,
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  };

  particularPost = (id, editPost) => {
    let headers = this.userService.appendHeaders();

    return this.http.get(`${this.basicUrl}/api/post/${id}`, {
      headers: headers,
      params: {
        edit: editPost,
      },
    });
  };

  userPosts = (username: string, pageSize: number, pageIndex: number) => {
    let headers = this.userService.appendHeaders();

    return this.http.get(`${this.basicUrl}/api/${username}/posts`, {
      headers: headers,
      params: {
        pageIndex: pageIndex.toLocaleString(),
        pageSize: pageSize.toLocaleString(),
      },
    });
  };

  delete = (postId: string) => {
    let headers = this.userService.appendHeaders();

    return this.http.delete(`${this.basicUrl}/api/post/${postId}`, {
      headers: headers,
    });
  };

  edit = (username, postId, postData) => {
    let headers = this.userService.multipartHeaders();

    this.http
      .patch(`${this.basicUrl}/api/${username}/${postId}`, postData, {
        headers: headers,
      })
      .subscribe(
        (res: any) => {
          this.openSnackBar(200, res);
        },
        (error) => {
          this.openSnackBar(error.status, error.msg);
        }
      );
  };

  openSnackBar(status: number, msg: string) {
    let snackBarRef = this.matSnackBar.open(msg, "Close", {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if (status === 200) {
        this.router.navigate(["home"]);
      }
    });
  }

  topPosts = () => {
    let headers = this.userService.appendHeaders();

    return this.http.get(`${this.basicUrl}/api/post/top`, {
      headers: headers,
    });
  };
}

export interface Blogs {
  _id: string;
  postTitle: string;
  postContent: string;
  postImage: string;
  publishedAt: Date;
  userId: string;
  postAuthor: string;
  comments: Number;
}
