import { NgModule } from '@angular/core';
import { TravelAgencyComponent } from './travel-agency/travel-agency.component';
import { travelAgencyRoutingModule } from './travel-agency.routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { SharedModule } from '../../../../shared/shared.module';
import { UtilitiesModule } from '../../../../utilties/utilities.module';
import { TypeaheadModule, AccordionModule } from 'ngx-bootstrap';
import { InboxComponent } from './travel-agency/inbox/inbox.component';
import { TripsComponent } from './travel-agency/trips/trips.component';
import { StuffComponent } from './travel-agency/stuff/stuff.component';
import { ReviewsComponent } from './travel-agency/reviews/reviews.component';
import { ProfileComponent } from './travel-agency/profile/profile.component';
import { TravelPicturesComponent } from './travel-agency/profile/travel-pictures/travel-pictures.component';
import { TravelAgencyInformationComponent } from './travel-agency/profile/travel-agency-information/travel-agency-information.component';
import { TravelAgencyDescriptionComponent } from './travel-agency/profile/travel-agency-description/travel-agency-description.component';
import { TravelAgencyCurrencyComponent } from './travel-agency/profile/travel-agency-currency/travel-agency-currency.component';

@NgModule({
  declarations: [TravelAgencyComponent, TravelAgencyInformationComponent, InboxComponent, StuffComponent, ReviewsComponent, ProfileComponent, TravelPicturesComponent, TravelAgencyDescriptionComponent, TravelAgencyCurrencyComponent],
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
