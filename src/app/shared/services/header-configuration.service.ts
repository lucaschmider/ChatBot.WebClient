import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HeaderConfiguration } from "../models/HeaderConfiguration";

@Injectable({
  providedIn: "root"
})
export class HeaderConfigurationService {
  private configurationSub = new BehaviorSubject<HeaderConfiguration>(HeaderConfiguration.DefaultValue);
  public configuration$ = this.configurationSub.asObservable();

  constructor() {}
}
