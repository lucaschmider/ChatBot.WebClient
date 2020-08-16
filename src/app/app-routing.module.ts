import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/auth.guard";
import { AdminGuard } from "./shared/admin.guard";
const routes: Routes = [
  {
    path: "chat",
    loadChildren: () => import("./chat/chat.module").then((m) => m.ChatModule),
    canActivateChild: [AuthGuard]
  },
  { path: "user", loadChildren: () => import("./user/user.module").then((m) => m.UserModule) },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
    canActivateChild: [AuthGuard, AdminGuard]
  },
  { path: "", redirectTo: "chat", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
