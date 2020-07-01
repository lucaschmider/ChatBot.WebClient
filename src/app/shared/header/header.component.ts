import { Component, OnInit } from '@angular/core';
import { HeaderConfigurationService } from "../services/header-configuration.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public configurationService: HeaderConfigurationService) { }

  ngOnInit(): void {
  }

}
