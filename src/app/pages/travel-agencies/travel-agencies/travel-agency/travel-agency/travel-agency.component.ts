import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../../../../../services/privileges.service';
import { FieldsService } from '../../../../../services/fields.service';
import { TRAVEL_MENU } from "../travel-menu.list";
import { ActivatedRoute } from '@angular/router';
import { TravelAgencyService } from '../travel-agency.service';
import { NbSidebarService } from '@nebular/theme';
@Component({
  selector: 'travel-agency',
  templateUrl: './travel-agency.component.html',
  styleUrls: ['./travel-agency.component.scss']
})
export class TravelAgencyComponent implements OnInit {


  menu = [];
  left:boolean;
  right:boolean;
  travelAgencyId: number;
  constructor(
    private privilegesService: PrivilegesService,
    private fieldService: FieldsService,
    private activatedroute: ActivatedRoute,
    private travelAgencyService: TravelAgencyService,
    private sidebarService:NbSidebarService
  ) { }
  ngOnInit() {
    let lang = localStorage.getItem('lang');
    this.right = lang == 'ar' ? true : false;
    this.left  = lang == 'en' ? true : false;
    if (!this.privilegesService.promise) {
      this.privilegesService.loadMyPrivileges();
    }
    this.privilegesService.promise
      .then(data => {
        this.menu = this.fieldService.getMenuItems(TRAVEL_MENU);
      })

    this.activatedroute.params.subscribe(param => {
      this.travelAgencyId = param['id'];
      this.travelAgencyService.setTravelAgencyId(this.travelAgencyId);
    })
  }

  toggleSidebar(): boolean {
    // this.sidebarService.toggle(true, 'travel-menu');
    // this.sidebarService.toggle(false, 'menu-sidebar')
    return false;
  }

}
