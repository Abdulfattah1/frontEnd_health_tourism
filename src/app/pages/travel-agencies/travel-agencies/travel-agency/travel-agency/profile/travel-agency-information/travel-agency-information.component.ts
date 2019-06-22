import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MainService } from '../../../../../../../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { TravelAgencyService } from '../../../travel-agency.service';
import { LocationsService } from '../../../../../../../services/locations.service';

@Component({
  selector: 'travel-agency-information',
  templateUrl: './travel-agency-information.component.html',
  styleUrls: ['./travel-agency-information.component.scss']
})
export class TravelAgencyInformationComponent implements OnInit {
  form: FormGroup;
  countries: any;
  cities: any;
  states: any;
  loading: boolean = true;
  originalLocation: any;
  location: any;
  marker: any;
  tableName: string;
  travelAgencyId: number;
  clinicInformation: any;
  constructor(
    private datePipe: DatePipe,
    private api: MainService,
    private tostr: ToastrService,
    private locationService: LocationsService,
    private travelAgencyService: TravelAgencyService
  ) { }


  ngOnInit() {
    this.tableName = "travel_agency";
    this.travelAgencyId = this.travelAgencyService.getTravelAgencyId();
    this.init();
    this.getSelectItems()
      .then().catch();
    this.travelAgencyService.getTravelAgencyInfo()
      .subscribe(res => {
        this.clinicInformation = res['data'][0];
        this.form.patchValue(
          {
            name: this.clinicInformation['name'],
            latitude: this.clinicInformation['latitude'],
            longitude: this.clinicInformation['longitude'],
            mobileNumber: this.clinicInformation['mobileNumber']
          }
        );
        this.location = {
          latitude: +this.form.get('latitude').value,
          longitude: +this.form.get('longitude').value
        }
        this.marker = this.location;
        this.loading = false;
      })
    this.locationService.getCountry(this.tableName, this.travelAgencyId)
      .then(data => {
        this.countryChanged();
        this.form.get('country').setValue(data[0]);
        this.form.get('country').updateValueAndValidity();
      })
    this.locationService.getCity(this.tableName, this.travelAgencyId)
      .then(data => {
        this.cityChanged();
        this.form.get('city').setValue(data[0]);
        this.form.get('city').updateValueAndValidity();
      })
    this.locationService.getState(this.tableName, this.travelAgencyId)
      .then(data => {
        this.form.get('state').setValue(data[0])
        this.form.get('state').updateValueAndValidity();
      })
  };
  async getSelectItems() {
    return new Promise(async (resolve, reject) => {
      try {
        this.countries = await this.getItems('location/countries');
        resolve(true);
      } catch (err) {
        reject(false);
      }
    })

  }

  countryChanged() {
    this.form.get('country').valueChanges.subscribe(async value => {
      if (!value) return;
      if (value['country_id'])
        value = value['country_id']
      this.form.get('city').setValue("");
      this.form.get('state').setValue("");
      let res = await this.getItems('location/cities/' + value);
      if (res) {
        this.cities = res;
      }
    })
  }

  cityChanged() {
    this.form.get('city').valueChanges.subscribe(async value => {
      if (!value) return;
      if (value['city_id'])
        value = value['city_id'];
      let country = this.form.get('country').value;
      if (country['country_id'])
        country = country['country_id'];
      this.form.get('state').setValue("");
      let res = await this.getItems('location/states/' + country + "/" + value);
      if (res) {
        this.states = res;
      }
    })
  }

  

  getItems(url) {
    return new Promise((resolve, reject) => {
      this.api.get(url)
        .subscribe(data => {
          if (data['success']) {
            resolve(data['data']);
          } else {
            this.tostr.error(data['message'], 'error');
            reject(false);
          }
        }, err => {
          this.tostr.error(err['message'], 'error');
          reject(false);
        })
    })
  }

  init() {
    this.form = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "city": new FormControl(null, [Validators.required]),
      "country": new FormControl(null, [Validators.required]),
      "state": new FormControl(null, [Validators.required]),
      "address": new FormControl(null, [Validators.required]),
      "mobileNumber": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "phoneNumber": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "latitude": new FormControl(null, [Validators.required]),
      "longitude": new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {

    let dataToSend = {
      ...this.form.value
    }
    dataToSend['status'] = this.clinicInformation['status'];
    dataToSend['userId'] = this.clinicInformation['userId'];
    dataToSend['description'] = this.clinicInformation['description'];
    dataToSend['map'] = ""
    dataToSend['country'] = dataToSend['country']['country_id'];
    dataToSend['city'] = dataToSend['city']['city_id'];
    dataToSend['state'] = dataToSend['state']['state_id'];
    this.travelAgencyService.editTravelAgency(dataToSend)
      .subscribe(data => {
        if (data['success']) {
          this.tostr.success(data['message'], 'success');
        }
      }, err => {
        this.tostr.error(err['message'], 'error');
      })
  }

  placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;
    this.form.get('latitude').setValue(lat);
    this.form.get('longitude').setValue(lng);
    this.form.get('latitude').updateValueAndValidity();
    this.form.get('longitude').updateValueAndValidity();
    this.marker = {
      latitude: lat,
      longitude: lng
    }
  }

  resetMarkersLocation() {
    this.form.get('latitude').setValue(this.location['latitude']);
    this.form.get('longitude').setValue(this.location['longitude']);
    this.form.get('latitude').updateValueAndValidity();
    this.form.get('longitude').updateValueAndValidity();
    this.marker = this.location;
  }




}
