import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";
import { Title } from "@angular/platform-browser";

import { AuthGuardService } from "./auth-guard.service";
import { UserService } from "./user.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  basicUrl: string = environment.basicUrl;

  user: User;

  authorized: Boolean = false;

  follower: Boolean = false;

  defaultProfileImage: string =
    "https://www.vikasanvesh.in/wp-content/themes/vaf/images/no-image-found-360x260.png";

  private _profileNames: string[];

  public model: ProfileNames;

  formatter = (profileName: ProfileNames) => profileName.fullName;

  private _nameList() {
    let headers = this.userService.appendHeaders();

    return this.http.get(`${this.basicUrl}/api/profile/name`, {
      headers: headers,
    });
  }

  constructor(
    private http: HttpClient,
    private authGuardService: AuthGuardService,
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {}

  getProfile() {
    let headers = this.userService.appendHeaders();
    let username: string = this.router.url;
    if (
      username.endsWith("edit") ||
      username.endsWith("followers") ||
      username.endsWith("following")
    ) {
      let endingPoint = username.split("/")[1];
      username = endingPoint;
    }

    this.http
      .get(`${this.basicUrl}/api/${username}`, {
        headers: headers,
      })
      .subscribe((res: any) => {
        let profileData = res.userDetails;
        profileData.name = `${profileData.firstName} ${profileData.lastName}`;
        this.titleService.setTitle(`${profileData.name} - Blogging Blogs`);
        if (profileData.profileImage != null) {
          profileData.profileImage = `${environment.basicUrl}/api/image/${profileData.profileImage}`;
        }
        this.user = profileData;
        this.authorized = res.authorized;
        this.follower = res.followerStatus;
      });
  }

  updateProfile(object, type: string) {
    let headers = this.userService.appendHeaders();
    return this.http.patch(
      `${this.basicUrl}/api/${this.authGuardService.currentUser}`,
      object,
      {
        params: {
          type: type,
        },
        headers: headers,
      }
    );
  }

  username(id: string) {
    let headers = this.userService.appendHeaders();

    return this.http.get(`${this.basicUrl}/api/profile/id`, {
      headers: headers,
      params: {
        id: id,
      },
    });
  }

  followProfileUser(profileId: string) {
    let headers = this.userService.appendHeaders();

    return this.http.post(
      `${this.basicUrl}/api/${profileId}/follower`,
      { profileId: profileId },
      {
        headers: headers,
      }
    );
  }

  unfollowProfileUser(profileId: string) {
    let headers = this.userService.appendHeaders();

    return this.http.delete(`${this.basicUrl}/api/${profileId}/follower`, {
      headers: headers,
    });
  }

  getUserFollowers(profileId: string, endingPoint: string) {
    let headers = this.userService.appendHeaders();

    return this.http.get(`${this.basicUrl}/api/${profileId}/${endingPoint}`, {
      headers: headers,
    });
  }

  prepareProfileNames() {
    this._nameList().subscribe((res: any) => {
      this._profileNames = res;
    });
  }

  typeahead = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((keyword) => keyword.length >= 2),
      map((keyword) =>
        this._profileNames.filter(
          (data) =>
            data["fullName"].toLowerCase().indexOf(keyword.toLowerCase()) > -1
        )
      )
    );

  redirectToProfilePage(id: string) {
    this.username(id).subscribe((res: any) => {
      this.router.navigate([`/profile/${res.username}`]);
    });
  }
}

export interface ProfileNames {
  id: string;
  fullName: string;
  profileImage: string;
}

export interface User {
  lastName: string;
  firstName: string;
  id: string;
  username: string;
  email: string;
  profileImage: string;
  name: string;
}
