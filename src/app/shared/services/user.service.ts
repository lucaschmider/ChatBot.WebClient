import { Injectable } from '@angular/core';
import { SharedModule } from "../shared.module";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/User';
import { environment } from '../../../environments/environment';
import { ICreateUserRequest } from '../models/ICreateUserRequest';

@Injectable({
  providedIn: SharedModule
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  public async CreateUserAsync(createUserRequest: ICreateUserRequest): Promise<User> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    console.log(accessToken);
    return await this.httpClient
      .post<User>(`${environment.backendApi}/user`, createUserRequest, { headers: httpHeaders })
      .toPromise();
  }

  public async DeleteUserAsync(uid: string): Promise<void> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    await this.httpClient
      .delete(`${environment.backendApi}/user/${uid}`, { headers: httpHeaders })
      .toPromise();
  }

  public async GetUsersAsync(): Promise<User[]> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return await this.httpClient
      .get<User[]>(`${environment.backendApi}/user`, { headers: httpHeaders })
      .toPromise();
  }
}
