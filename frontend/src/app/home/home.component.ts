import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { PostService, Blogs } from "../service/post.service";
import { ProfileService } from "../service/profile.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private postService: PostService,
    private profileService: ProfileService,
    private titleService: Title,
    private router: Router
  ) {}

  pageSize: number = 3;

  pageIndex: number = 0;

  blogArray: Array<Blogs> = [];

  topBlogs: Array<Blogs> = [];

  cardBorder: Array<String> = [
    "card border-primary",
    "card border-info",
    "card border-success",
  ];

  ngOnInit() {
    this.postService
      .allPosts(this.pageIndex, this.pageSize)
      .subscribe((res: any) => {
        let resData = res;
        let len = resData.blogs.length;
        for (let i = 0; i < len; i++) {
          if (resData.blogs[i].userImage != null) {
            let imageUrl = `${environment.basicUrl}/api/user/image/${resData.blogs[i].userId}`;
            resData.blogs[i].userImage = imageUrl;
          } else if (resData.blogs[i].postImage != null) {
            let imageUrl = `${environment.basicUrl}/api/image/${resData.blogs[i].postImage}`;
            resData.blogs[i].postImage = imageUrl;
          }
          this.blogArray.push(resData.blogs[i]);
        }
      });

    this.titleService.setTitle("Home - Blogging Blogs");
    this.profileService.prepareProfileNames();

    this.postService.topPosts().subscribe((res: any) => {
      let resData = res.topBlogs;
      for (let i = 0; i < resData.length; i++) {
        if (resData[i].users[0].profileImage != null) {
          let imageUrl = `${environment.basicUrl}/api/user/image/${resData.blogs[i].userId}`;
          resData[i].postImage = imageUrl;
        } else {
          resData[i].postImage = this.profileService.defaultProfileImage;
        }
      }
      this.topBlogs = resData;
    });
  }

  onScroll() {
    this.pageIndex = this.pageIndex + 1;
    this.postService
      .allPosts(this.pageIndex, this.pageSize)
      .subscribe((res: any) => {
        let resData = res;
        let len = resData.blogs.length;
        for (let i = 0; i < len; i++) {
          this.blogArray.push(resData.blogs[i]);
        }
      });
  }

  profilePage(id) {
    this.profileService.redirectToProfilePage(id);
  }

  showPost(postId: string) {
    this.router.navigate(["/post", postId]);
  }
}
