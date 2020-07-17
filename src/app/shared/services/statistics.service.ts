import { Injectable } from '@angular/core';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  public async rateMessage(rating: number, message: Message): Promise<void> {

  }
}
