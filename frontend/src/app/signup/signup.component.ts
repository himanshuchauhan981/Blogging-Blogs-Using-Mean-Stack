import { Component, OnInit, ViewChild } from "@angular/core";

import { SignupFormComponent } from "./signup-form/signup-form.component";
import { UserService } from "../service/user.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signUpSuccess: Boolean;

  constructor(private userService: UserService, private titleService: Title) {}

  id: string;

  ngOnInit() {
    this.userService.signUpObservable.subscribe((value) => {
      this.signUpSuccess = value;
    });

    this.titleService.setTitle("Sign Up- Blogging Blogs");
  }

  itemSelected(e) {
    this.id = e;
  }
}
