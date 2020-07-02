import { Component, OnInit } from '@angular/core';
import { HeaderConfigurationService } from "../services/header-configuration.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public configurationService: HeaderConfigurationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public navigateToRoot(): void {
    this.router.navigate(["/"]);
  }

  public navigateToStats(): void {
    this.router.navigate(["/statistics"]);
  }

  public navigateToChat(): void {
    this.router.navigate(["/chat"])
  }
}
