import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StatisticsRoutingModule } from "./statistics-routing.module";
import { StatisticsMainComponent } from "./statistics-main/statistics-main.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [StatisticsMainComponent],
  imports: [CommonModule, SharedModule, StatisticsRoutingModule]
})
export class StatisticsModule {}
