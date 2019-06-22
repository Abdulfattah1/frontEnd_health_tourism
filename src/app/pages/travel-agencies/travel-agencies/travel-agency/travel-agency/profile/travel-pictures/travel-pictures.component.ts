import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TravelAgencyService } from '../../../travel-agency.service';

@Component({
  selector: 'travel-pictures',
  templateUrl: './travel-pictures.component.html',
  styleUrls: ['./travel-pictures.component.scss']
})
export class TravelPicturesComponent implements OnInit {


  slides: any[] = [];
  shown: boolean;
  travelId: number;
  loading:boolean = false;
  constructor(
    private tostr: ToastrService,
    private TravelAgencyService: TravelAgencyService
  ) { }

  ngOnInit() {
    this.travelId = this.TravelAgencyService.getTravelAgencyId();
    this.TravelAgencyService.getTravelImages()
    .subscribe(data=>{
      this.slides = data['data'];
      this.loading = true;
    })
  }

  deleteImage(event) { };
  addImages(event) { };

}
