import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelAgencyComponent } from './travel-agency/travel-agency.component';

const routes: Routes = [
    {
        path: '',
        component: TravelAgencyComponent,
        data: ['travelAgency'],
        // canActivate: [privilegesGuard],
        children: [
            {
                path: "inbox",
                // canActivateChild: [privilegesGuard],
                // data: ['clinics'],
            },
            {
                path: "profile",
                //component:ProfileComponent
            },
            {
                path: "treatments",
                //component:TreatmentsComponent
            },
            {
                path: "stuff",
                //component:StuffComponent
            },
            {
                path: "reviews",
                //component:ReviewsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class travelAgencyRoutingModule {
}