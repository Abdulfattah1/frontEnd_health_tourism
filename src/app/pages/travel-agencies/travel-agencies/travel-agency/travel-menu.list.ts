import { NbMenuItem } from '@nebular/theme';

export const TRAVEL_MENU: NbMenuItem[] = [

  {
    title: 'List.travelAgency',
    group: true,
    data: { privilege: ['travelAgency'] }
  },
  {
    title: 'List.inbox',
    icon: 'nb-home',
    link: 'inbox',
    home: true,
    data: { privilege: ['inbox'] }
  },
  {
    title: "List.profile",
    icon: 'nb-locked',
    link: "profile",
    data: { privilege: ['TravelAgencyDescription'] }
  },
  {
    title: "List.trips",
    icon: 'nb-locked',
    link: 'trips',
    data: { privilege: ['trips'] },
    children:[
      {
        title: "List.allTrips",
        icon: 'nb-locked',
        link: 'allTrips',
        data: { privilege: ['trips'] }
      },
      {
        title: "List.myTrips",
        icon: 'nb-locked',
        link: 'myTrips',
        data: { privilege: ['myTrips'] }
      },
      {
        title: "List.addTrip",
        icon: 'nb-locked',
        link: 'addTrip',
        data: { privilege: ['addTrip'] }
      }
    ]
  },
  {
    title: "List.stuff",
    icon: 'nb-locked',
    link: 'stuff',
    data: { privilege: ['stuff'] }
  },
  {
    title: "List.reviews",
    icon: 'nb-locked',
    link: 'reviews',
    data: { privilege: ['stuff'] }
  }
];
