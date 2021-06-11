import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { PostService, Blogs } from "../../service/post.service";
import { ProfileService, User } from "src/app/service/profile.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "view-all-posts",
  templateUrl: "./view-all-posts.component.html",
  styleUrls: ["./view-all-posts.component.css"],
})
export class ViewAllPostsComponent implements OnInit {
  userPost: Array<Blogs> = [];

  authenticated: Boolean;

  userDetails: User;

  basicUrl: string = environment.basicUrl;

  pageSize: number = 3;

  pageIndex: number = 0;

  username: string;

  constructor(
    private postService: PostService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.username = params.id;
      this.postService
        .userPosts(this.username, this.pageSize, this.pageIndex)
        .subscribe((res: any) => {
          let resData = res.userPosts;
          let userDetails = res.userDetails;
          this.userPost = [];
          for (let i = 0; i < resData.length; i++) {
            if (resData[i].postImage != null) {
              let imageUrl = `${this.basicUrl}/api/image/${resData[i].postImage}`;
              resData[i].postImage = imageUrl;
            }
            this.userPost.push(resData[i]);
          }
          if (userDetails.profileImage != null) {
            let imageUrl = `${this.basicUrl}/api/image/${userDetails.profileImage}`;
            userDetails.profileImage = imageUrl;
            this.userDetails = userDetails;
          } else {
            userDetails.profileImage = this.profileService.defaultProfileImage;
            this.userDetails = userDetails;
          }
          this.authenticated = res.authenticated;
        });
    });
  }

  editPost(postAuthor: string, postId: string) {
    this.router.navigate([`/${postAuthor}/${postId}/edit`]);
  }

  deletePost(id: string) {
    console.log(id);
    this.postService.delete(id).subscribe(
      (res: any) => {
        this.userPost = this.userPost.filter((post) => post._id != id);
        this.openSnackBar(res.msg);
      },
      (error) => {
        this.openSnackBar(error.msg);
      }
    );
  }

  openSnackBar(msg: string) {
    this.matSnackBar.open(msg, "Close", {
      duration: 2000,
    });
  }

  onScroll() {
    this.pageIndex = this.pageIndex + 1;
    this.postService
      .userPosts(this.username, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        let resData = res.userPosts;
        for (let i = 0; i < resData.length; i++) {
          if (resData[i].postImage != null) {
            let imageUrl = `${this.basicUrl}/api/image/${resData[i].postImage}`;
            resData[i].postImage = imageUrl;
          }
          this.userPost.push(resData[i]);
        }
      });
  }
}
