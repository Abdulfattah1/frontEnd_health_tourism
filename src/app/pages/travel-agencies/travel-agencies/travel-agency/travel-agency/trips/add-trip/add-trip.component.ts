import { Component, OnInit } from '@angular/core';
import { TripsService } from '../trips.service';
import { TravelAgencyService } from '../../../travel-agency.service';

@Component({
  selector: 'add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {


  private generalInfoStatus:boolean;
  constructor(
    private tripsService: TripsService,
    private travelAgencyService: TravelAgencyService
  ) { }

  ngOnInit() {

  }

  statusChange(status) {
    this.generalInfoStatus = status;
  }

  submitGeneralInfo(values) {
    console.log(values);
  }

}
