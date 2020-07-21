import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-case-selector',
  templateUrl: './use-case-selector.component.html',
  styleUrls: ['./use-case-selector.component.scss']
})
export class UseCaseSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public navigate(event: any): void {
    console.log(event);
  }
}
