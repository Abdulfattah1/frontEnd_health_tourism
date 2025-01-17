import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../clinic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  Currency: any;
  Currencies: any;
  constructor(
    private tostr: ToastrService,
    private clinicService: ClinicService
  ) { }

  ngOnInit() {
    this.getAllCurrencies();
    this.getCurrencyById();
  }

  getAllCurrencies() {
    return this.clinicService.getAllCurrencies()
      .then(res => {
        this.Currencies = res;
      })
  }

  getCurrencyById() {
    this.clinicService.getCurrencies()
      .then(res => {
        this.Currency = res;
      }).catch(err => {
        this.tostr.error(err['message'], 'error');
      })
  }

  addCurrency() {
    let dataToSend = [];
    this.Currency.forEach(item=>{
      dataToSend.push(item['id']);
    })
    console.log(dataToSend);
    this.clinicService.addCurrency(dataToSend)
      .subscribe(data => {
        if (data['success']) {
          this.tostr.success(data['message'], 'success');
        }
      }, err => {
        this.tostr.error(err['message'], 'error');
      })
  }

}
