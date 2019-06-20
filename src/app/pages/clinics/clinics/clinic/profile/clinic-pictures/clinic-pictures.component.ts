import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../clinic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'clinic-pictures',
  templateUrl: './clinic-pictures.component.html',
  styleUrls: ['./clinic-pictures.component.scss']
})
export class ClinicPicturesComponent implements OnInit {


  slides: any[] = [];
  shown: boolean;
  constructor(
    private tostr: ToastrService,
    private clinicService: ClinicService
  ) { }

  ngOnInit() {
  }

  deleteImage(event) { };
  addImages(event) { };
}
