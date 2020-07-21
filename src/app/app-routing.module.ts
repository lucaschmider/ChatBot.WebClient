import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  {
    path: "chat",
    loadChildren: () => import("./chat/chat.module").then((m) => m.ChatModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: "statistics",
    loadChildren: () => import("./statistics/statistics.module").then((m) => m.StatisticsModule),
    canActivateChild: [AuthGuard]
  },
  { path: "user", loadChildren: () => import("./user/user.module").then((m) => m.UserModule) },
  { path: "", redirectTo: "chat", pathMatch: "full" },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
