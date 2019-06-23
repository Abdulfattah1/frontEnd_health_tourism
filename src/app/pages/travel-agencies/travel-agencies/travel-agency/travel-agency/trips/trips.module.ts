import { NgModule } from '@angular/core';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { MembersComponent } from './members/members.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { tripsRoutingModule } from './trips-routing-module';
import { TripsComponent } from './trips.component';

@NgModule({
  declarations: [TripsComponent, TripsTableComponent, AddTripComponent, EditTripComponent, MembersComponent],
  imports: [
    SharedModule,
    tripsRoutingModule
  ]
})
export class TripsModule { }
