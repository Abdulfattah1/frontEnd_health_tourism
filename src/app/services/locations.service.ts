import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  coordinates: any;
  constructor(
    private api: MainService
  ) { }
  public getPosition(): Observable<Position> {
    return Observable.create(
      (observer) => {
        navigator.geolocation.getCurrentPosition((pos: Position) => {
          observer.next(pos);
        }),
          () => {
            console.log('Position is not available');
          }
      });
  }

  getCity(tableName, id) {
    return new Promise((resolve, reject) => {
      this.api.post('location/getCity', { tableName, id }).subscribe(data => {
        if (data['success']) {
          resolve(data['data']);
        }
      }, err => {
        reject(false);
      })
    })
  }

  getCountry(tableName, id) {
    return new Promise((resolve, reject) => {
      this.api.post('location/getCountry', { tableName, id }).subscribe(data => {
        if (data['success']) {
          resolve(data['data']);
        }
      }, err => {
        reject(false);
      })
    })
  }

  getState(tableName, id) {
    return new Promise((resolve, reject) => {
      this.api.post('location/getState', { tableName, id }).subscribe(data => {
        if (data['success']) {
          resolve(data['data']);
        }
      }, err => {
        reject(false);
      })
    })
  }
}
