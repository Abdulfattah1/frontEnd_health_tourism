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
  clinicId: number;
  loading:boolean = false;
  constructor(
    private tostr: ToastrService,
    private clinicService: ClinicService
  ) { }

  ngOnInit() {
    this.clinicId = this.clinicService.getClinicId();
    this.clinicService.getClinicImages()
    .subscribe(data=>{
      this.slides = data['data'];
      this.loading = true;
    })
  }

  deleteImage(event) { };
  addImages(event) { };
}
