import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { SharedModule } from '../shared/shared.module';
import { UseCaseSelectorComponent } from './use-case-selector/use-case-selector.component';
import { UserManagerComponent } from './user-manager/user-manager.component';


@NgModule({
  declarations: [AdminMainComponent, UseCaseSelectorComponent, UserManagerComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
