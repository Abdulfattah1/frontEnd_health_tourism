import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClinicsService } from '../../../clinics/clinics.service';
import { ToastrService } from 'ngx-toastr';
import { TravelAgenciesService } from '../../travel-agencies.service';

@Component({
  selector: 'travel-agencies-table',
  templateUrl: './travel-agencies-table.component.html',
  styleUrls: ['./travel-agencies-table.component.scss']
})
export class TravelAgenciesTableComponent implements OnInit {

  URL: string;
  addingUrl: string;
  deletionUrl: string;
  edtingUrl: string;
  acceptingUrl: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private TravelAgenciesService: TravelAgenciesService,
    private toster: ToastrService
  ) { }

  ngOnInit() {
    console.log('here');
    this.activatedRoute.url.subscribe(Url => {
      this.URL = Url[0].path;
      console.log(this.URL);
      if (this.URL == 'TravelAgenciesByStatus') {
        this.settings = this.settings1;
        this.deletionUrl = "travelAgencies/TravelAgenciesByStatus"
      }
      if (this.URL == 'allTravelAgencies' || this.URL == 'myTravelAgencies') {
        this.settings = this.settings2;
        this.addingUrl = 'travelAgencies/addTravelAgency'
        this.edtingUrl = 'travelAgencies/editTravelAgency'
        this.deletionUrl = 'travelAgencies/deleteTravelAgency'
      }
      this.URL = 'travelAgencies/' + this.URL;
      if (this.URL == 'travelAgencies/myTravelAgencies') {
        this.URL = this.URL + "/" + this.TravelAgenciesService.getUserId();
      }
      if (this.URL == 'travelAgencies/TravelAgenciesByStatus') {
        this.URL = this.URL + "?status=" + "pending"
      }
    })
  }
  lang = localStorage.getItem('lang');
  settings = {};
  settings1 = {
    mode: "external",
    attr: {
      class: "text-center"
    },
    delete: {
      deleteButtonContent: `<i class="nb-trash"></i>`,
      privilege: ['deleteTravelAgency'],
      confirm: true
    },
    actions: {
      // custom: [
      //   {
      //     name: 'accept',
      //     title: `<i class="nb-trash"></i>`,
      //     privilege: ['accpetClinic'],
      //   }
      // ],
      add: false,
      delete: true,
      edit: false,
      position: this.lang == 'ar' ? 'left' : 'right'
    },
    columns: {}
  };

  settings2 = {
    mode: "external",
    attr: {
      class: "text-center"
    },
    add: {
      addButtonContent: '<i  class="ion-ios-plus-outline"></i>',
      privilege: ['addTravelAgency']
    },
    delete: {
      deleteButtonContent: `<i class="nb-trash"></i>`,
      privilege: ['deleteTravelAgency'],
      confirm: true
    },
    edit: {
      editButtonContent: `<i class="nb-edit"></i>`,
      privilege: ['editTravelAgency']
    },
    actions: {
      add: true,
      delete: true,
      edit: true,
      position: this.lang == 'ar' ? 'left' : 'right'
    },
    columns: {}
  };
}
