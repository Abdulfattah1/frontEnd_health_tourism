import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TravelAgenciesService } from '../../travel-agencies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationsService } from '../../../../services/locations.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'add-travel-agency',
  templateUrl: './add-travel-agency.component.html',
  styleUrls: ['./add-travel-agency.component.scss']
})
export class AddTravelAgencyComponent implements OnInit {

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
    private tostr: ToastrService,
    private travelAgenciesService: TravelAgenciesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private geoLocationService: LocationsService,
    private api: MainService
  ) { }

  ngOnInit() {
    this.init();
    this.getSelectItems()
      .then(res => {
        this.loading = false;
        this.countryChanged();
        this.cityChanged();
      }, err => {
        this.loading = false;
        this.tostr.error('there was a problem the clinic types');
      });
    this.getlocation()
      .then(location => {
        this.location = location;
        this.resetMarkersLocation();
        this.marker = this.location;
      })
  }

  getlocation() {
    return new Promise((resolve, reject) => {
      this.geoLocationService.getPosition().subscribe(
        (pos: Position) => {
          let Pos = { latitude: +pos.coords.latitude, longitude: +pos.coords.longitude };
          this.originalLocation = Pos;
          resolve(Pos);
        }, err => {
          reject(false);
        });
    })
  }

  countryChanged() {
    this.form.get('country').valueChanges.subscribe(async value => {
      if (!value) return;
      let res = await this.getItems('location/cities/' + value);
      if (res) {
        this.cities = res;
      }
    })
  }

  cityChanged() {
    this.form.get('city').valueChanges.subscribe(async value => {
      if (!value) return;
      let country = this.form.get('country').value;
      let res = await this.getItems('location/states/' + country + "/" + value);
      if (res) {
        this.states = res;
      }
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
    let travelAgencyData = {
      ...this.form.value,
      map:"",
      userId: this.travelAgenciesService.getUserId()
    }
    this.travelAgenciesService.addTravelAgency(travelAgencyData)
      .subscribe(data => {
        if (data['success']) {
          this.tostr.success('travel agency added', 'success');
          setTimeout(() => {
            this.form.reset();
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          }, 1000);
        } else {
          this.tostr.error("travel agency  was not added", 'error');
        }
      }, err => {
        this.tostr.error("travel agency was not added", 'error');
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


}
