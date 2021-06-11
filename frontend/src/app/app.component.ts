import { Component, OnInit } from "@angular/core";
import * as AOS from "aos";
import { UserService } from "./service/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    AOS.init();
  }
}
