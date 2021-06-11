import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ProfileService } from "../../service/profile.service";
import { signupValidators } from "src/app/signup/signup-form/signup.validators";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private matSnackBar: MatSnackBar
  ) {}

  nameForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
  });

  emailForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  passwordForm = new FormGroup(
    {
      currentPassword: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl("", Validators.required),
    },
    {
      validators: signupValidators.MustMatch,
    }
  );

  ngOnInit() {}

  setUsername() {
    this.nameForm.setValue({
      firstName: this.profileService.user.firstName,
      lastName: this.profileService.user.lastName,
    });
  }

  setEmail() {
    this.emailForm.setValue({
      email: this.profileService.user.email,
    });
  }

  changeUsername(nameForm: FormGroup) {
    let data = nameForm.value;
    let type = "name";
    let status =
      this.profileService.user.firstName == data.firstName &&
      this.profileService.user.lastName == data.lastName;
    if (!status) {
      this.profileService.updateProfile(data, type).subscribe((res: any) => {
        this.profileService.user.name = `${res.firstName} ${res.lastName}`;
        this.matSnackBar.open(res.msg, "Close", {
          duration: 3000,
        });
      });
    }
  }

  changeEmail(emailForm: FormGroup) {
    let data = emailForm.value;
    let validEmail = emailForm.valid;
    let type = "email";
    let status = this.profileService.user.email == data.email;
    if (!status && validEmail) {
      this.profileService.updateProfile(data, type).subscribe(
        (res: any) => {
          this.profileService.user.email = res.email;
          this.matSnackBar.open(res.msg, "Close", {
            duration: 3000,
          });
        },
        (error) => {
          this.matSnackBar.open(error.msg, "Close", {
            duration: 3000,
          });
        }
      );
    }
  }

  changePassword(passwordForm: FormGroup) {
    let data = passwordForm.value;
    let type = "password";
    let validPassword = passwordForm.valid;
    if (validPassword) {
      this.profileService.updateProfile(data, type).subscribe(
        (res: any) => {
          this.matSnackBar.open(res.msg, "Close", {
            duration: 3000,
          });
        },
        (error) => {
          this.matSnackBar.open(error.msg, "Close", {
            duration: 3000,
          });
        }
      );
    }
  }
}
