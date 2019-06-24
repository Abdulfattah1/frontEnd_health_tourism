import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TripsService } from '../trips.service';
import { TravelAgencyService } from '../../../travel-agency.service';
import { Subscribable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {


  private generalInfoStatus: boolean = true;
  tripGeneralInformation: any;
  tripImages: any[];
  hotelInfo: any[];
  hotelImages:any[];
  subscriber: Subscription = new Subscription();
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private tostr: ToastrService,
    private tripsService: TripsService,
    private activatedRoute: ActivatedRoute,
    private travelAgencyService: TravelAgencyService
  ) { }

  ngOnInit() {

  }

  statusChange(values) {
    this.submitGeneralInfo(values);
  }

  submitGeneralInfo(values) {
    this.tripGeneralInformation = values;
    this.tripGeneralInformation['finishTo'] = this.datePipe.transform(values['finishTo'], 'yyyy-MM-dd');
    this.tripGeneralInformation['startFrom'] = this.datePipe.transform(values['startFrom'], 'yyyy-MM-dd');
    this.generalInfoStatus = false;
  }

  imagesChanged(images) {
    this.tripImages = images
  }

  hotelInfoChanged(info) {
    this.hotelInfo = info;
  }

  hotelImagesChanged(images) {
    this.hotelImages = images;
  }

  next() {
  }

  submit() {
    let sub = this.tripsService.addTrip(this.tripGeneralInformation, this.tripImages, this.hotelInfo,this.hotelImages)
      .subscribe(data => {
        if (data['success']) {
          this.tostr.success('it was added successfuly', 'succes');
          this.router.navigate(["../"], { relativeTo: this.activatedRoute })
        }
      }, err => {
        this.tostr.error('try again please', 'error');
      })


    this.subscriber.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
