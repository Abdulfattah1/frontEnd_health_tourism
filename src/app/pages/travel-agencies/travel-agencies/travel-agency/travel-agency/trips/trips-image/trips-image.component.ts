import { Component, OnInit, Output } from '@angular/core';
import { TripsService } from '../trips.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'trips-image',
  templateUrl: './trips-image.component.html',
  styleUrls: ['./trips-image.component.scss']
})
export class TripsImageComponent implements OnInit {

  slides: any[] = [];
  @Output('submitImages') submitImages = new EventEmitter();
  constructor(
    private tripsService: TripsService
  ) { }

  ngOnInit() {
    // this.tripsService.addImages()
  }

  imagesChanged(images) {    
    this.submitImages.emit(images);
  }

}
