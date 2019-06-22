import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TravelAgencyService } from '../../../travel-agency.service';

@Component({
  selector: 'travel-agency-description',
  templateUrl: './travel-agency-description.component.html',
  styleUrls: ['./travel-agency-description.component.scss']
})
export class TravelAgencyDescriptionComponent implements OnInit {

  description: string;
  constructor(
    private tostr: ToastrService,
    private travelAgencyService: TravelAgencyService
  ) { }

  ngOnInit() {
    this.travelAgencyService.getDescription()
      .then(res => {
        this.description = res['description'];
      });
  }

  addescription() {
    this.travelAgencyService.addescription(this.description).then(res => {
      if (res) {
        this.tostr.success("description was added successful", 'success');
      }
    }).catch(err => {
      this.tostr.error("there was an error while adding the description");
    })
  }

}
