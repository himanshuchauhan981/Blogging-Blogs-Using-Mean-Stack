import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SESSION_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private basicUrl: string = environment.basicUrl;

  public signUpObservable = new Subject<Boolean>();

  public token: string;

  public loginObservable = new Subject<Boolean>();

  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) {}

  saveUser = (userDetails) => {
    return this.http.post(`${this.basicUrl}/api/signup`, userDetails);
  };

  setSignUpObservable = (value) => {
    this.signUpObservable.next(value);
  };

  saveProfilePhoto = (imageDetails) => {
    return this.http.post(`${this.basicUrl}/api/signup/image`, imageDetails);
  };

  login = (object) => {
    return this.http.post(`${this.basicUrl}/api/login`, object);
  };

  storeJWTToken = (token: string) => {
    this.storage.set("token", token);
    this.loginObservable.next(true);
  };

  validateJWTToken = () => {
    let options = this.appendHeaders();

    return this.http.post(`${this.basicUrl}/api/token`, null, {
      headers: options,
    });
  };

  logout = () => {
    this.storage.remove("token");
    this.loginObservable.next(false);
  };

  appendHeaders = () => {
    this.token = this.storage.get("token");

    let headers = new HttpHeaders().set("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${this.token}`);

    return headers;
  };

  getToken() {
    return this.storage.get("token");
  }

  multipartHeaders = () => {
    this.token = this.storage.get("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    return headers;
  };
}
