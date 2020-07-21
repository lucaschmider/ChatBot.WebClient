import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UseCaseSelectorComponent } from '../use-case-selector/use-case-selector.component';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet
  ) {
    const bottomSheetRef = bottomSheet.open(UseCaseSelectorComponent, {
      ariaLabel: 'Share on social media'
    });
  }

  ngOnInit(): void {
  }

}
