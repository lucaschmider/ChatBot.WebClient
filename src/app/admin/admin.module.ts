import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { StatisticsMainComponent } from "./statistics-main/statistics-main.component";

@NgModule({
  declarations: [AdminMainComponent, UserManagerComponent, AddUserDialogComponent, StatisticsMainComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
