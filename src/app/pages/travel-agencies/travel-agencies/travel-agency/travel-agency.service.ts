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

  getDescription() {

    return new Promise((resolve, reject) => {
      this.api.get('travelAgencies/getDescreption/' + this.travelAgencyId)
        .subscribe(data => {
          if (data['success'])
            resolve(data['data']);
        }, err => {
          reject(false);
        })
    })
  }

  addescription(descreption: string) {
    return new Promise((resolve, reject) => {
      this.api.put('travelAgencies/addDescreption/' + this.travelAgencyId, { descreption })
        .subscribe(data => {
          if (data['success'])
            resolve(true);
        }, err => {
          reject(false);
        })
    })
  }

  getTravelImages() {
     return this.api.get('travelAgencies/getAllImgaesByTravelAgencyId/' + this.travelAgencyId)
  }
}
