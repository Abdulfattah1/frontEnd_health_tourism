import { NgModule } from '@angular/core';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { tripsRoutingModule } from './trips-routing-module';
import { TripsComponent } from './trips.component';
import { HotelComponent } from './hotel/hotel.component';
import { MembersComponent } from './members/members.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripsImageComponent } from './trips-image/trips-image.component';

@NgModule({
  declarations: [
    TripsComponent,
    TripsTableComponent,
    TripsComponent,
    HotelComponent,
    MembersComponent,
    EditTripComponent,
    AddTripComponent,
    TripsImageComponent
  ],
  imports: [
    SharedModule,
    tripsRoutingModule
  ]
})
export class TripsModule { }
