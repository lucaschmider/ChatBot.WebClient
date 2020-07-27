import { Component, OnInit } from "@angular/core";
import { HeaderConfigurationService } from "../services/header-configuration.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(
    public configurationService: HeaderConfigurationService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  public navigateToRoot(): void {
    this.router.navigate(["/"]);
  }

  public navigateToSettings(): void {
    this.router.navigate(["/admin"]);
  }

  public navigateToChat(): void {
    this.router.navigate(["/chat"]);
  }

  public navigateToLogin(): void {
    this.router.navigate(["/user/login"]);
  }
}
