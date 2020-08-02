import { Injectable } from "@angular/core";
import { CanActivate, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService) {}
  canActivateChild(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => !!user && user.isAdmin)
    );
  }
  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => !!user && user.isAdmin)
    );
  }
}
