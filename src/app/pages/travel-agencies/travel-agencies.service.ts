import { Injectable } from '@angular/core';
import { AuthService } from '../../Auth/Auth.service';
import { MainService } from '../../services/main.service';

@Injectable({
  providedIn: 'root'
})
export class TravelAgenciesService {

  constructor(
    
    private api:MainService,
    private authService:AuthService,
    ) { }

  getUserId() {
    return this.authService.getUserId();
  }

  addTravelAgency(data) {
    return this.api.post("travelAgencies/addTravelAgency/" +this.getUserId(),data);
  }
}
