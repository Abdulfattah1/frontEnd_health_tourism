import { Injectable } from '@angular/core';
import { MainService } from '../../../../services/main.service';

@Injectable({
  providedIn: 'root'
})
export class TravelAgencyService {

  private travelAgencyId: number;
  constructor(
    private api: MainService
  ) { }

  setTravelAgencyId(travelAgencyId) {
    this.travelAgencyId = travelAgencyId;
  }

  getTravelAgencyId() {
    return this.travelAgencyId;
  }

  getTravelAgencyInfo() {
    return this.api.get('travelAgencies/travelAgencyById' + "/" + this.travelAgencyId);
  }

  editTravelAgency(info) {
    let dataToSend = {
      ...info,
    }
    return this.api.put('travelAgencies/editTravel/' + this.travelAgencyId, dataToSend);
  }
}
