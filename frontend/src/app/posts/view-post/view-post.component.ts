import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";

import { PostService, Blogs } from "../../service/post.service";
import { CommentService, Comment } from "../../service/comment.service";
import { DeleteCommentDialogBoxComponent } from "../../dialog-box/delete-comment-dialog-box/delete-comment-dialog-box.component";
import { ProfileService } from "src/app/service/profile.service";
import { LikeService } from "src/app/service/like.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.css"],
})
export class ViewPostComponent implements OnInit {
  post: Blogs;

  commentCount: number = 0;

  clearComment = "";

  isCommentEdited: Boolean = false;

  likeState: Boolean = false;

  userImage: String;

  commentsList: Array<Comment> = [];

  commentIndex: number = 0;

  commentSize: number = 3;

  lastDocument: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private profileService: ProfileService,
    private likeService: LikeService,
    private router: Router,
    private titleService: Title,
    private matDialog: MatDialog
  ) {}

  commentForm = new FormGroup({
    comment: new FormControl("", Validators.required),
  });

  submit(commentValues, postId) {
    this.commentService.post(commentValues, postId).subscribe((res: any) => {
      this.commentsList = res.data;
      this.commentCount = res.length;
      this.clearComment = null;
    });
  }

  ngOnInit() {
    let postID = this.activatedRoute.snapshot.params.id;
    let editPost = false;
    this.postService.particularPost(postID, editPost).subscribe((res: any) => {
      this.likeState = res.likeStatus;
      let post = res.post;
      if (post.postImage != null) {
        post.postImage = `${environment.basicUrl}/api/image/${post.postImage}`;
      }
      this.commentCount = res.commentCount;
      this.post = post;
      this.titleService.setTitle(res.post.postTitle);
      if (res.post.user[0].profileImage != null) {
        this.userImage = res.post.user[0].profileImage;
      } else this.userImage = this.profileService.defaultProfileImage;
    });

    this.commentService.getEmittedComment().subscribe((data) => {
      let index = this.commentsList.findIndex((p) => p._id == data._id);
      this.commentsList.splice(index, 1);
      this.commentCount = this.commentCount - 1;
    });
  }

  getComments(postId: string) {
    let length = this.commentsList.length;
    if (length == 0) {
      this.paginateComments(postId, this.commentIndex, this.commentSize);
    }
  }

  paginateComments(postId: string, index: number, size: number) {
    this.commentService.get(postId, index, size).subscribe((res: any) => {
      this.commentsList = [];
      this.lastDocument = res["lastDocument"];
      for (let i = 0; i < res["commentData"].length; i++) {
        res["commentData"][
          i
        ].createdBy = `${res["commentData"][i].user.firstName} ${res["commentData"][i].user.lastName}`;
        this.commentsList.push(res["commentData"][i]);
      }
    });
  }

  previousComments(postId: string) {
    this.commentIndex = this.commentIndex + 1;
    this.paginateComments(postId, this.commentIndex, this.commentSize);
  }

  dialogBox(commentId) {
    this.matDialog.open(DeleteCommentDialogBoxComponent, {
      width: "450px",
      data: { id: commentId },
    });
  }

  userProfile(userId) {
    this.profileService.username(userId).subscribe((res: any) => {
      this.router.navigate([`/profile/${res.username}`]);
    });
  }

  postLike(postId) {
    this.likeService.post(postId).subscribe((res: boolean) => {
      this.likeState = res;
    });
  }
}
