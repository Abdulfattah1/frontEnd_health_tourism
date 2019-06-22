import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelAgencyComponent } from './travel-agency/travel-agency.component';
import { InboxComponent } from './travel-agency/inbox/inbox.component';
import { TripsComponent } from './travel-agency/trips/trips.component';
import { StuffComponent } from './travel-agency/stuff/stuff.component';
import { ReviewsComponent } from './travel-agency/reviews/reviews.component';
import { ProfileComponent } from './travel-agency/profile/profile.component';

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
                component: InboxComponent
            },
            {
                path: "profile",
                component: ProfileComponent
            },
            {
                path: "trips",
                component: TripsComponent
            },
            {
                path: "stuff",
                component: StuffComponent
            },
            {
                path: "reviews",
                component: ReviewsComponent
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