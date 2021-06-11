import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  isTrue: boolean = false;

  currentUser: string;

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.userService.validateJWTToken().subscribe(
      (res: any) => {
        this.userService.loginObservable.next(true);
        this.isTrue = true;
        this.router.navigate([state.url]);
        this.currentUser = res.user.username;
      },
      (error) => {
        this.userService.loginObservable.next(false);
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url },
        });
        this.isTrue = false;
      }
    );
    return this.isTrue;
  }
}
