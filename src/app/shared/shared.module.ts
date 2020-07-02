import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    NgxChartsModule
  ]
})
export class SharedModule { }
