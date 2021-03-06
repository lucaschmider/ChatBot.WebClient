import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StarRatingModule } from "@sreyaj/ng-star-rating";
import { StarRatingComponent } from "./star-rating/star-rating.component";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { InvalidInputComponent } from "./invalid-input/invalid-input.component";
import { TranslateModule, TranslatePipe } from "@ngx-translate/core";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    TranslateModule,
    MatProgressSpinnerModule
  ],
  declarations: [HeaderComponent, StarRatingComponent, LoadingSpinnerComponent, InvalidInputComponent],
  exports: [
    HeaderComponent,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    TranslateModule,
    MatSnackBarModule,
    StarRatingModule,
    StarRatingComponent,
    MatBottomSheetModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    MatChipsModule,
    TranslateModule
  ],
  providers: [TranslatePipe]
})
export class SharedModule {}
