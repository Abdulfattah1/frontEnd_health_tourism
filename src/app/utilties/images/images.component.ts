import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImagesService } from './images.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {



  @Input() id: number;
  @Input() slides: any[] = [];
  @Input() files: any[];
  @Input() shown: boolean;
  @Input() isItFile: boolean;
  @Input() fileName: string;
  @Output() submit = new EventEmitter();
  @Output() deleteImage = new EventEmitter();
  @Output('imagesChanged') imagesChanged = new EventEmitter();
  @ViewChild('imageModel') private imageModel;
  urls = new Array<string>();
  uploadPath: string;
  activeSlideIndex = 0;
  imagesToSend: FormData = new FormData();
  subsctiber: Subscription = new Subscription();
  constructor(
    private modalService: NgbModal,
    private tostr: ToastrService,
    private imagesService: ImagesService
  ) {
  }

  ngOnInit() {
    console.log(this.slides);
    this.uploadPath = environment.upload + "images/" + this.fileName + "/";
  };

  ngOnChanges(changes: SimpleChanges): void {
  }


  addSlide(files: FileList): void {
    for (var i = 0; i < files.length; i++) {
      if (this.imagesService.checkImagesType(files[i].type))
        this.imagesToSend.append('image', files[i], files[i].name);
    }
    if (this.id) {
      this.save();
    } else {
      this.getImagesNames();
    }
  }


  getImagesNames() {
    this.imagesService.getImagesNames(this.fileName, this.imagesToSend)
      .subscribe(images => {
        if (images['success']) {
          this.tostr.success('it was added successfuly');
          images['data'].forEach(image => {
            this.slides.push(image);
            this.imagesChanged.emit(this.slides);
          })
          this.imagesToSend = new FormData();
        }
      })
  }


  save() {
    let add = this.imagesService.addImages(this.fileName, this.imagesToSend, this.id)
      .subscribe(images => {
        if (images['success']) {
          this.tostr.success('it was added successfuly', 'success');
          images['data'].forEach(image => {
            this.slides.push(image);
          })
          this.imagesToSend = new FormData();
        }
      })
    this.subsctiber.add(add);
  }



  removeSlide(index?: number): void {
    if (!this.id) {
      this.slides.splice(this.activeSlideIndex, 1);
      this.imagesChanged.emit(this.slides);
      return;
    }
    let imageId = this.slides[this.activeSlideIndex]['id'];
    let delete1 = this.imagesService.deleteImage(this.fileName, imageId)
      .subscribe(data => {
        if (data['success']) {
          this.tostr.success('it was deleted successfuly', 'success');
          this.slides.splice(this.activeSlideIndex, 1);
        }
      }, err => {
        this.tostr.error('there was a problem', 'error');
      })
    this.subsctiber.add(delete1);
  }

  getImagesUrl(files) {
    this.urls = [];
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  ngOnDestroy(): void {
    this.subsctiber.unsubscribe();
  }
}
