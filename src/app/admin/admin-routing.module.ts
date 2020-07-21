import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes: Routes = [
  { path: "user", component: UserManagerComponent },
  { path: '', component: AdminMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
