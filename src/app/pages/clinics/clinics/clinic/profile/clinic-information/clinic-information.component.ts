import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ClinicService } from '../../clinic.service';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../../../../../services/main.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'clinic-information',
  templateUrl: './clinic-information.component.html',
  styleUrls: ['./clinic-information.component.scss']
})
export class ClinicInformationComponent implements OnInit {
  form: FormGroup;
  clinicTypes: any;
  countries: any;
  cities: any;
  states: any;
  loading: boolean = true;
  originalLocation: any;
  location: any;
  marker: any;
  constructor(
    private datePipe: DatePipe,
    private api: MainService,
    private tostr: ToastrService,
    private clinicService: ClinicService
  ) { };
  ngOnInit() {

    this.init();
    this.getSelectItems()
      .then().catch();
    this.clinicService.getClinicTypes()
      .then(res => {
        this.form.get('clinicTypes').setValue(res);
      })
    this.clinicService.getClinicInfo()
      .subscribe(res => {
        this.form.patchValue(res['data'][0]);
        this.location = {
          latitude: +this.form.get('latitude').value,
          longitude: +this.form.get('longitude').value
        }
        this.marker = this.location;
        this.loading = false;
      })
    this.clinicService.getClinicCountry()
      .then(data => {
        this.countryChanged();
        this.form.get('country').setValue(data[0]);
        this.form.get('country').updateValueAndValidity();
      })
    this.clinicService.getClinicCity()
      .then(data => {
        this.cityChanged();
        this.form.get('city').setValue(data[0]);
        this.form.get('city').updateValueAndValidity();
      })
    this.clinicService.getClinicstate()
      .then(data => {
        this.form.get('state').setValue(data[0])
        this.form.get('state').updateValueAndValidity();
      })


  };
  async getSelectItems() {
    return new Promise(async (resolve, reject) => {
      try {
        this.clinicTypes = await this.getItems('clinics/clinicTypes');
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
      console.log(country, value);
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
  // getClinicTypes() {
  //   this.clinicService.getClinicTypes()
  //     .then(types => {
  //       this.form.get('clinicTypes').setValue(types);
  //       this.form.get('clinicTypes').updateValueAndValidity();
  //     })
  // }
  init() {
    this.form = new FormGroup({
      "clinicTypes": new FormControl(null),
      "clinicName": new FormControl(null, [Validators.required, Validators.minLength(3)]),
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
    console.log(this.form.value);
    let tempTypes = [];
    this.form.value['clinicTypes'].forEach(type => {
      tempTypes.push(type['spec_id']);
    })

    let dataToSend = {
      ...this.form.value
    }
    console.log(dataToSend);
    dataToSend['clinicTypes'] = tempTypes;
    dataToSend['country'] = dataToSend['country']['country_id'];
    dataToSend['city'] = dataToSend['city']['city_id'];
    dataToSend['state'] = dataToSend['state']['state_id'];
    this.clinicService.editClinic(dataToSend)
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
