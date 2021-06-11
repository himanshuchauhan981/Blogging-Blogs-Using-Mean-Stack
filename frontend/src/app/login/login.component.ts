import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../service/user.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginError: string = null;

  hidePassword = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private titleService: Title
  ) {}

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  ngOnInit() {
    this.titleService.setTitle("Login - Blogging Blogs");
  }

  loginUser(loginForm: FormGroup) {
    let validState = this.loginForm.valid;
    if (validState) {
      this.userService.login(loginForm.value).subscribe(
        (res: any) => {
          let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
          this.userService.storeJWTToken(res.token);
          this.router.navigate([returnUrl || "home"]);
        },
        (error) => {
          this.loginError = error.msg;
        }
      );
    }
  }
}
