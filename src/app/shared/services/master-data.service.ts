import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { SharedModule } from "../shared.module";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: SharedModule
})
export class MasterDataService {

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  public async GetDepartmentsAsync(): Promise<string[]> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<string[]>(`${environment.backendApi}/master-data/departments`, { headers: httpHeaders })
      .toPromise();
  }
}
