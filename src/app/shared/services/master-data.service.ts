import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { SharedModule } from "../shared.module";
import { environment } from "../../../environments/environment";
import { ICollectionScheme } from "../models/ICollectionScheme";
import { Knowledge } from "../models/Knowledge";
import { Department } from "../models/Department";

@Injectable({
  providedIn: SharedModule
})
export class MasterDataService {

  private static readonly knowledgeCollection = "knowledge";


  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  public async getCollectionDataAsync(collection: string): Promise<Knowledge[] | Department[]> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<Knowledge[]>(`${environment.backendApi}/master-data/data/${collection}`, { headers: httpHeaders })
      .toPromise();
  }

  public async createKnowledgeAsync(knowledge: Knowledge): Promise<void | string> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    await this.httpClient
      .post<void>(`${environment.backendApi}/master-data/data/knowledge`, knowledge, { headers: httpHeaders })
      .toPromise();

  }

  public async getCollectionSchemeAsync(collection: string): Promise<ICollectionScheme> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<ICollectionScheme>(`${environment.backendApi}/master-data/scheme/${collection}`, { headers: httpHeaders })
      .toPromise();
  }

  public async deleteData(element: any, collection: string): Promise<void> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    let dataId = element._id;
    if (collection === MasterDataService.knowledgeCollection) {
      dataId = element.name;
    }

    return this.httpClient
      .delete<void>(`${environment.backendApi}/master-data/data/${collection}/${dataId}`, { headers: httpHeaders })
      .toPromise();
  }

  public async createDataAsync(element: any, collection: string) {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    let data = element;
    if (collection === MasterDataService.knowledgeCollection) {
      data = {
        definitiontype: element.definitiontype,
        description: element.description,
        synonyms: element.keywords.split(","),
        name: element.name
      }
    }
    console.log(data);
    return this.httpClient
      .post<Department | Knowledge>(`${environment.backendApi}/master-data/data/${collection}`, data, { headers: httpHeaders })
      .toPromise();
  }
}
