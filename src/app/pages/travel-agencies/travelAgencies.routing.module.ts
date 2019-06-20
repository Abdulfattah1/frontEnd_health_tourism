import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { TravelAgenciesComponent } from './travel-agencies/travel-agencies.component';
import { TravelAgenciesTableComponent } from './travel-agencies/travel-agencies-table/travel-agencies-table.component';

const routes: Routes = [
    {
        path: '',
        component: TravelAgenciesComponent,
        // data: ['clinics'],
        // canActivate: [privilegesGuard],
        children: [
            {
                path: "",
                // canActivateChild: [privilegesGuard],
                // data: ['clinics'],
                children: [
                    {
                        path: "allTravelAgencies",
                        // canActivate: [privilegesGuard],
                        // data: ['allTravelAgencies'],
                        component: TravelAgenciesTableComponent
                    },
                    {
                        path: "TravelAgenciesByStatus",
                        // canActivate: [privilegesGuard],
                        // data: ['TravelAgenciesByStatus'],
                        component: TravelAgenciesTableComponent
                    },
                    {
                        path: "myTravelAgencies",
                        // canActivate: [privilegesGuard],
                        // data: ['myTravelAgencies'],
                        component: TravelAgenciesTableComponent
                    },
                    {
                        path: "addTravelAgency",
                        // canActivate: [privilegesGuard],
                        // data: ['addTravelAgency'],
                        //component: AddClinicComponent
                    },
                    {
                        path: "editTravelAgency/:id",
                        // canActivate: [AuthGuard],
                        // data:['editTravelAgency'],
                        loadChildren: "../clinics/clinics/clinic/clinic.module#ClinicModule"
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class travelAgenciesRoutingModule {
}