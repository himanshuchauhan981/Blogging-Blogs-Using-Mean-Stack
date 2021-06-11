import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CommentService } from "../../service/comment.service";

@Component({
  selector: "delete-comment-dialog-box",
  templateUrl: "./delete-comment-dialog-box.component.html",
  styleUrls: ["./delete-comment-dialog-box.component.css"],
})
export class DeleteCommentDialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCommentDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: commentData,
    private matSnackBar: MatSnackBar,
    private commentService: CommentService
  ) {}

  closeDialogBox() {
    this.dialogRef.close();
  }

  deleteComment() {
    this.commentService.delete(this.data.id).subscribe((res: any) => {
      this.closeDialogBox();
      if (res.status === 200) {
        this.commentService.changeComment(res.json().data);
      }
      this.matSnackBar.open(res.json().msg, "Close", {
        duration: 8000,
      });
    });
  }
}

export interface commentData {
  id: string;
}
