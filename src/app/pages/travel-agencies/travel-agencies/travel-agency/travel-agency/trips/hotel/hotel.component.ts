import { Component, OnInit, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {


  @Output('hotelInfoChanged') hotelInfoChanged:EventEmitter<any> = new EventEmitter();
  @Output('imagesChanged') imagesChanged:EventEmitter<any> = new EventEmitter();
  generalInfo:any[];
  constructor() { }

  ngOnInit() {
  }

  hotelStatusChanged(values) {
    this.hotelInfoChanged.emit(values);
  }

  submitGeneralInfo(values) {
    this.generalInfo = values;
  }

  imagesChangedF(images) {
    this.imagesChanged.emit(images);
  }
}
