import { Injectable } from '@angular/core';
import { MainService } from '../../../../../../services/main.service';
import { TravelAgencyService } from '../../travel-agency.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(
    private api: MainService,
    private travelAgencyService: TravelAgencyService
  ) { }

  addTrip(tripGeneralInformation, tripImages, hotelInfo, hotelImages) {
    let dataToSend = {
      tripGeneralInformation,
      tripImages,
      hotelInfo,
      hotelImages,
      TravelAgencyId: this.travelAgencyService.getTravelAgencyId()
    }
    return this.api.post('trips/addCompleteTrip', dataToSend);
  }
}
