import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips.component';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { MembersComponent } from './members/members.component';
const routes: Routes = [
    {
        path: '',
        component: TripsComponent,
        data: ['trips'],
        // canActivate: [privilegesGuard],
        children: [
            {
                path: "add",
                // canActivateChild: [privilegesGuard],
                // data: ['addTrip'],
                component: AddTripComponent
            },
            {
                path: 'myTrips',
                // canActivateChild: [privilegesGuard],
                // data: ['myTrip'],
                component: TripsTableComponent
            },
            {
                path: "edit",
                // canActivateChild: [privilegesGuard],
                // data: ['editTrip'],
                component: EditTripComponent
            },
            {
                path: "mumbers",
                // canActivateChild: [privilegesGuard],
                // data: ['member'],
                component: MembersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class tripsRoutingModule {
    constructor() {
        
    }
}