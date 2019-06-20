import { Injectable } from '@angular/core';
import { AuthService } from '../../Auth/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class TravelAgenciesService {

  constructor(
    private authService:AuthService
  ) { }

  getUserId() {
    return this.authService.getUserId();
  }
}
