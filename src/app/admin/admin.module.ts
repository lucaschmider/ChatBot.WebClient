import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { StatisticsMainComponent } from "./statistics-main/statistics-main.component";
import { MasterDataMainComponent } from './master-data-main/master-data-main.component';
import { MasterDataTableComponent } from './master-data-table/master-data-table.component';

@NgModule({
  declarations: [AdminMainComponent, UserManagerComponent, AddUserDialogComponent, StatisticsMainComponent, MasterDataMainComponent, MasterDataTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
