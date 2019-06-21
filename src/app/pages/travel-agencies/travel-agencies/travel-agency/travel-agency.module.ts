import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelAgencyComponent } from './travel-agency/travel-agency.component';
import { travelAgencyRoutingModule } from './travel-agency.routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { SharedModule } from '../../../../shared/shared.module';
import { UtilitiesModule } from '../../../../utilties/utilities.module';
import { TypeaheadModule, AccordionModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [TravelAgencyComponent],
  imports: [
    ThemeModule,
    SharedModule,
    UtilitiesModule,
    TypeaheadModule,
    AccordionModule.forRoot(),
    travelAgencyRoutingModule
  ]
})
export class TravelAgencyModule { 
  constructor() {
  }
}
