import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TravelAgencyService {

  private travelAgencyId: number;
  constructor() { }

  setTravelAgencyId(travelAgencyId) {
    this.travelAgencyId = travelAgencyId;
  }

  getTravelAgencyId() {
    return this.travelAgencyId;
  }
}
