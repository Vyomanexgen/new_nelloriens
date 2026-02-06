import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Time filters
  timeFilters: [
    { id: 1, label: "This Week" },
    { id: 2, label: "Today" },
    { id: 3, label: "This Month" },
    { id: 4, label: "Upcoming" },
  ],

  // Location filters
  locationFilters: [
    { id: 1, label: "Nellore" },
    { id: 2, label: "Gudur" },
    { id: 3, label: "Kavali" },
    { id: 4, label: "Mypadu" },
  ],

  // Category filters
  categoryFilters: [
    { id: 1, label: "Free" },
    { id: 2, label: "Paid" },
    { id: 3, label: "Cultural" },
    { id: 4, label: "Sports" },
    { id: 5, label: "Community" },
    { id: 6, label: "Health" },
    { id: 7, label: "Networking" },
  ],

  // Featured Events
  featuredEvents: [
    {
      id: 1,
      title: "Tourism Festival Opening Night",
      date: "Fri - 6:00 PM",
      location: "Beach Road",
      category: "Free",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
      primaryAction: "Register",
      secondaryAction: "Details",
    },
    {
      id: 2,
      title: "Folk Music Evening",
      date: "Sat - 7:30 PM",
      location: "Town Hall",
      category: "Cultural",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      primaryAction: "Book Seat",
      secondaryAction: "Details",
    },
  ],

  // Upcoming This Week
  upcomingEvents: [
    {
      id: 3,
      title: "Coastal Cleanup Drive",
      date: "Sun - 7:00 AM",
      location: "Mypadu Beach",
      category: "Community",
    },
    {
      id: 4,
      title: "Blood Donation Camp",
      date: "Sun - 10:00 AM",
      location: "RTC Center",
      category: "Health",
    },
    {
      id: 5,
      title: "Startup Meetup",
      date: "Wed - 5:30 PM",
      location: "CoWork Hub",
      category: "Networking",
    },
    {
      id: 6,
      title: "State Volleyball Trials",
      date: "Sat - 9:00 AM",
      location: "Stadium",
      category: "Sports",
    },
  ],

  // Plan Ahead Events
  planAheadEvents: [
    {
      id: 7,
      title: "Nellore Food Carnival",
      date: "Dec 15 - 4:00 PM",
      location: "Exhibition Grounds",
      category: "Tickets",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
      primaryAction: "Get Tickets",
      secondaryAction: "Details",
    },
    {
      id: 8,
      title: "Nellore City Marathon",
      date: "Dec 22 - 5:30 AM",
      location: "City Center",
      category: "Registration",
      image:
        "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=250&fit=crop",
      primaryAction: "Register",
      secondaryAction: "Route Map",
    },
  ],

  // Today in Nellore
  todayInfo: {
    weather: {
      temperature: "31°C",
      condition: "Partly Cloudy",
      source: "IMD",
    },
    traffic: {
      status: "Peak near Magunta Layout",
      action: "Advisory",
    },
  },

  // Top Destinations
  topDestinations: [
    {
      id: 1,
      name: "Mypadu Beach",
      description: "Sunset spot",
      action: "Explore",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Udayagiri Fort",
      description: "Historic",
      action: "Guide",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
    },
  ],

  // Common Ads
  commonAds: [
    {
      id: 1,
      title: "Festival Electronics Sale",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      action: "Shop",
    },
    {
      id: 2,
      title: "Coaching Admissions Open",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop",
      action: "Enroll",
    },
  ],

  // Filter options for Filters section
  filterCategories: ["Cultural", "Sports", "Community"],
  filterDates: ["Today", "This Week", "This Month"],
  filterLocations: ["Nellore", "Gudur", "Mypadu"],

  // Active filters
  activeFilters: {
    category: null,
    date: null,
    location: null,
  },
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setActiveTimeFilter: (state, action) => {
      state.activeFilters.time = action.payload;
    },
    setActiveCategoryFilter: (state, action) => {
      state.activeFilters.category = action.payload;
    },
    setActiveLocationFilter: (state, action) => {
      state.activeFilters.location = action.payload;
    },
    setActiveDateFilter: (state, action) => {
      state.activeFilters.date = action.payload;
    },
    resetFilters: (state) => {
      state.activeFilters = {
        category: null,
        date: null,
        location: null,
        time: null,
      };
    },
  },
});

export const setEventsTimeFilter = eventsSlice.actions.setActiveTimeFilter;
export const setEventsCategoryFilter =
  eventsSlice.actions.setActiveCategoryFilter;
export const setEventsLocationFilter =
  eventsSlice.actions.setActiveLocationFilter;
export const setEventsDateFilter = eventsSlice.actions.setActiveDateFilter;
export const resetFilters = eventsSlice.actions.resetFilters;

export default eventsSlice.reducer;
