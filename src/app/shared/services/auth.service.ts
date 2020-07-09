import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ILoginResult } from "../models/ILoginResult";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.getUserData(user.uid);
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  public async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  public async signIn({ email, password }: { email: string, password: string }) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/']);
      return { wasSuccessful: true } as ILoginResult;
    } catch (error) {
      return { wasSuccessful: false, errorCode: error.code } as ILoginResult;
    }

  }

  private getUserData(uid: string): Observable<User> {
    return of({
      uid,
      isAdmin: false,
      name: "Max Mustermann"
    });
  }
}
