import { Injectable } from "@angular/core";
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

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  public async getCollectionDataAsync(collection: string): Promise<Knowledge[] | Department[]> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<Knowledge[]>(`${environment.backendApi}/masterdata/data/${collection}`, { headers: httpHeaders })
      .toPromise();
  }

  public async createKnowledgeAsync(knowledge: Knowledge): Promise<void | string> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    await this.httpClient
      .post<void>(`${environment.backendApi}/masterdata/data/knowledge`, knowledge, { headers: httpHeaders })
      .toPromise();
  }

  public async getCollectionSchemeAsync(collection: string): Promise<ICollectionScheme> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<ICollectionScheme>(`${environment.backendApi}/masterdata/scheme/${collection}`, { headers: httpHeaders })
      .toPromise();
  }

  public async deleteData(element: any, collection: string): Promise<void> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    let dataId = element.id;
    if (collection === MasterDataService.knowledgeCollection) {
      dataId = `${element.definitionType}/${element.name}`;
    }

    return this.httpClient
      .delete<void>(`${environment.backendApi}/masterdata/data/${collection}/${dataId}`, { headers: httpHeaders })
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
        definitionType: element.definitionType,
        description: element.description,
        synonyms: element.keywords.split(","),
        name: element.name
      };
    }
    return this.httpClient
      .post<Department | Knowledge>(`${environment.backendApi}/masterdata/data/${collection}`, data, {
        headers: httpHeaders
      })
      .toPromise();
  }
}
