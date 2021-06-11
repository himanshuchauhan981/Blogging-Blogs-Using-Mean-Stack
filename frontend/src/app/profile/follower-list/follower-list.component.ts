import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProfileService, ProfileNames } from "src/app/service/profile.service";

@Component({
  selector: "app-follower-list",
  templateUrl: "./follower-list.component.html",
  styleUrls: ["./follower-list.component.css"],
})
export class FollowerListComponent implements OnInit {
  endingPoint: string;

  userList: [];

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
    let url = this.router.url.split("/");
    this.endingPoint = url[2];
    this.profileService
      .getUserFollowers(url[1], this.endingPoint)
      .subscribe((res: any) => {
        this.userList = res;
      });
  }
}
