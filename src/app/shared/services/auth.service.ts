import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, flatMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ILoginResult } from "../models/ILoginResult";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(async user => {
        // Logged in
        if (user) {
          const r = await this.getUserData();
          return r;
        } else {
          // Logged out
          return of(null);
        }
      }),
      flatMap(value => value)
    )
  }

  public async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/user/login']);
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

  public async getIdToken(): Promise<string> {
    const currentUser = await this.afAuth.currentUser;
    if (!currentUser) { return null; }
    return currentUser.getIdToken();
  }

  private async getUserData(): Promise<Observable<User>> {
    const accessToken = await this.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient.get<User>("http://localhost:3000/user/details", { headers: httpHeaders });
  }
}
