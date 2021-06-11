import { AbstractControl } from "@angular/forms";

export class signupValidators {
  static MustMatch(control: AbstractControl) {
    const password: string = control.get("password").value;
    const confirmPassword: string = control.get("confirmPassword").value;
    if (password !== confirmPassword) {
      control.get("confirmPassword").setErrors({ mustMatch: true });
    } else {
      control.get("confirmPassword").setErrors(null);
    }
    return null;
  }
}
