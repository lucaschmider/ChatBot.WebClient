import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IDepartmentFeedback } from "../models/IDepartmentFeedback";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  public async rateMessage(rating: number): Promise<void> {
    const feedbackBody: any = {
      rating
    };

    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    this.httpClient
      .post(`${environment.backendApi}/statistics/feedback`, feedbackBody, { headers: httpHeaders })
      .subscribe(() => {});
  }

  public async getUserSatisfaction() {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.httpClient
      .get<IDepartmentFeedback[]>(`${environment.backendApi}/statistics`, { headers: httpHeaders })
      .toPromise();
  }
}
