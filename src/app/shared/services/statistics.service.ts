import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  public async rateMessage(rating: number): Promise<void> {
    const feedbackBody: any = {
      rating
    };

    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    this.httpClient.post(`${environment.backendApi}/statistics/feedback`, feedbackBody, { headers: httpHeaders }).subscribe(() => { });
  }
}
