import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { SharedModule } from "../shared.module";
import { environment } from "../../../environments/environment";
import { ICollectionScheme } from "../models/ICollectionScheme";

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
      .get<string[]>(`${environment.backendApi}/master-data/data/departments`, { headers: httpHeaders })
      .toPromise();
  }

  public async GetKnowledgeAsync(): Promise<any> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<string[]>(`${environment.backendApi}/master-data/data/knowledge`, { headers: httpHeaders })
      .toPromise();
  }

  public async GetCollectionSchemeAsync(collection: string): Promise<ICollectionScheme> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<ICollectionScheme>(`${environment.backendApi}/master-data/scheme/${collection}`, { headers: httpHeaders })
      .toPromise();
  }
}
