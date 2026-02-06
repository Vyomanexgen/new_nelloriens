import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sportsHero from "../../assets/images/sports-hero.jpg";
import { BASE_URL } from "../../services/config";

// Sync Thunks
export const createFixture = createAsyncThunk(
  "sports/createFixture",
  async (fixtureData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/sports-createFixture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fixtureData),
      });
      if (!response.ok) throw new Error("Failed to create fixture");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getFixtures = createAsyncThunk(
  "sports/getFixtures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/sports-getFixtures`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch fixtures");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createMatchResult = createAsyncThunk(
  "sports/createMatchResult",
  async (resultData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/sports-createMatchResult`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData),
      });
      if (!response.ok) throw new Error("Failed to create match result");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMatchResults = createAsyncThunk(
  "sports/getMatchResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/sports-getMatchResults`);
      if (!response.ok) throw new Error("Failed to fetch match results");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMatchResult = createAsyncThunk(
  "sports/getMatchResult",
  async (matchId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/sports-getMatchResult?matchId=${matchId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch match result");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  // Hero Section
  heroImage: sportsHero,
  heroImageAlt: "Sports hero image",

  // Categories for filter
  categories: [
    { id: 1, label: "All" },
    { id: 2, label: "Cricket" },
    { id: 3, label: "Volleyball" },
    { id: 4, label: "Kabaddi" },
    { id: 5, label: "Athletics" },
    { id: 6, label: "Football" },
  ],

  // Regions for filter
  regions: [
    { id: 1, label: "All" },
    { id: 2, label: "Nellore" },
    { id: 3, label: "Gudur" },
    { id: 4, label: "Kavali" },
    { id: 5, label: "Mypadu" },
  ],

  // Status State
  // Status State
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  currMatchResult: null,

  // Live Scores (Mapped from Match Results for now or separate logic)
  liveScores: [],
  mockLiveScores: [
    {
      id: 1,
      match: "Nellore XI vs Gudur CC",
      sport: "Cricket",
      score: "134/6 (17.2)",
      type: "T20",
      isLive: true,
    },
    {
      id: 2,
      match: "District Qualifiers Court-2",
      sport: "Volleyball",
      score: "Set 2 - 18-16",
      type: "Live",
      isLive: true,
    },
  ],

  // Upcoming Fixtures
  upcomingFixtures: [],
  mockUpcomingFixtures: [
    {
      id: 1,
      title: "School Cricket Finals",
      date: "Fri",
      time: "3:30 PM",
      location: "Municipal Ground",
      category: "Cricket",
      fullContent:
        "The highly anticipated School Cricket Finals will take place this Friday at the Municipal Ground. The top two teams from the district league will battle it out for the championship trophy. \n\n Spectators are welcome to attend. Entry is free. The match will be followed by a prize distribution ceremony attended by the District Sports Officer.",
    },
    {
      id: 2,
      title: "Kabaddi Zonal Semis",
      date: "Sat",
      time: "6:00 PM",
      location: "Stadium Court A",
      category: "Kabaddi",
      fullContent:
        "The Zonal Semi-finals for the Kabaddi championship are scheduled for Saturday evening. Four teams remain in the hunt for the zonal title. \n\n Expect high-intensity raids and tackles as players vie for a spot in the finals. Court A at the main stadium has been prepped for the event with enhanced lighting for the evening matches.",
    },
    {
      id: 3,
      title: "10K City Marathon",
      date: "Sun",
      time: "5:30 AM",
      location: "Beach Road",
      category: "Athletics",
      fullContent:
        "The annual City 10K Marathon kicks off this Sunday at 5:30 AM from Beach Road. Over 500 runners have registered for the event, which aims to promote fitness and healthy living. \n\n Traffic diversions will be in place along the beach route from 5 AM to 9 AM. Water stations and medical aid posts will be available at every 2km mark.",
    },
    {
      id: 4,
      title: "Inter-school Volleyball Finals",
      date: "Sun",
      time: "4:00 PM",
      location: "Indoor Arena",
      category: "Volleyball",
      fullContent:
        "The Indoor Arena will host the Inter-school Volleyball Finals on Sunday afternoon. The girls' and boys' finals will be played back-to-back. \n\n This tournament has seen exceptional talent this year, with several players being scouted for the district team. Come and cheer for the future stars of Nellore volleyball.",
    },
  ],

  // Sports News
  sportsNews: [
    {
      id: 1,
      title: "National Games: State clinches 3 golds in athletics",
      posted: "2h ago",
      tag: "Featured",
      fullContent:
        "In a stunning display of speed and endurance, the state athletics team secured three gold medals at the ongoing National Games. \n\n The victories came in the 100m sprint, 400m relay, and long jump events. The athletes have dedicated their wins to their coaches and the intense training camps held in Nellore prior to the games. The Chief Minister has announced cash rewards for the medalists.",
    },
    {
      id: 2,
      title: "District volleyball trials draw record turnout",
      posted: "4h ago",
      tag: "Local",
      fullContent:
        "The district-level volleyball selection trials held yesterday saw a record turnout of over 200 aspirants. Coaches were impressed by the raw talent on display, particularly from the rural belts of the district. \n\n A shortlist of 30 players will be announced tomorrow for the upcoming training camp. The selected players will represent the district in the state inter-district championship next month.",
    },
    {
      id: 3,
      title: "School cricket league announces new format",
      posted: "Yesterday",
      tag: "Update",
      fullContent:
        "The organizing committee of the School Cricket League has unveiled a new format for the upcoming season. To make the league more competitive, teams will now be divided into two groups, playing a round-robin stage followed by knockouts. \n\n Additionally, a 'Super Sub' rule has been introduced to allow teams more tactical flexibility. The season is set to begin in the second week of November.",
    },
    {
      id: 4,
      title: "Nellore runner qualifies for state marathon finals",
      posted: "2d ago",
      tag: "Athletics",
      fullContent:
        "Local long-distance runner, Ravi Kumar, has qualified for the State Marathon Finals after clocking a personal best time in the regional qualifiers. \n\n Ravi, who trains at the AC Stadium, finished the 42km course in 2 hours and 45 minutes. 'My goal is to finish on the podium at the state level,' he said. The finals will be held in Visakhapatnam next month.",
    },
    {
      id: 5,
      title: "Kabaddi: Nellore City team announced",
      posted: "3d ago",
      tag: "Kabaddi",
      fullContent:
        "The official squad for the Nellore City Kabaddi team was announced today by the district association. The team features a mix of experienced raiders and young defenders. \n\n The squad will be led by veteran captain, P. Suresh. They are set to play their first match of the season against Tirupati next week.",
    },
    {
      id: 6,
      title: "New Tennis Academy opens in Magunta Layout",
      posted: "4d ago",
      tag: "Tennis",
      fullContent:
        "A state-of-the-art Tennis Academy was inaugurated in Magunta Layout today. The facility boasts 4 synthetic courts and floodlights for night play. \n\n 'We want to produce national-level players from Nellore,' said the head coach during the opening ceremony. Registration for summer camps is now open.",
    },
    {
      id: 7,
      title: "District Badminton Championship: Under-15 results",
      posted: "5d ago",
      tag: "Badminton",
      fullContent:
        "The Under-15 District Badminton Championship concluded with thrilling finals. In the boys' singles, K. Arjun defeated M. Rohit in straight sets. \n\n The girls' singles title was clinched by S. Priya. The winners will represent the district in the upcoming state zonal tournament.",
    },
    {
      id: 8,
      title: "Football: AC Subba Reddy Stadium to get turf upgrade",
      posted: "1w ago",
      tag: "Football",
      fullContent:
        "The iconic AC Subba Reddy Stadium is set for a major upgrade. The sports authority has sanctioned funds to lay a new international-standard artificial turf. \n\n Work is expected to begin next month and completed within 3 months. This move will allow the stadium to host national-level football matches.",
    },
    {
      id: 9,
      title: "Swimming: Summer camp registrations full",
      posted: "1w ago",
      tag: "Swimming",
      fullContent:
        "The annual summer swimming camp at the municipal pool has seen an overwhelming response, with all slots getting booked within 2 days. \n\n Organizers are now considering adding an extra batch in the evenings to accommodate the high demand. The camp focuses on teaching life-saving skills and competitive swimming strokes.",
    },
    {
      id: 10,
      title: "Cricket: Local talent scouted for IPL trials",
      posted: "2w ago",
      tag: "Cricket",
      fullContent:
        "Three young cricketers from the district league have been invited for IPL trials by a major franchise. This is a historic moment for Nellore cricket. \n\n The players - a fast bowler, a spinner, and a wicket-keeper batsman - impressed scouts during the recent zonal T20 tournament.",
    },
    {
      id: 11,
      title: "Chess: Grandmaster simulation at Town Hall",
      posted: "2w ago",
      tag: "Chess",
      fullContent:
        "A Grandmaster simultaneous exhibition match will be held at the Town Hall this Sunday. Local chess enthusiasts will get a chance to play against a visiting Grandmaster. \n\n The event is organized to promote chess among school children. Spectator entry is free.",
    },
    {
      id: 12,
      title: "Hockey: District team selection trials",
      posted: "3w ago",
      tag: "Hockey",
      fullContent:
        "Selection trials for the District Hockey Team (Men & Women) will be held at the Police Ground next Saturday. Players aged 18-25 are eligible to participate. \n\n Participants must bring their own kit and age proof. The selected team will go on a 2-week training camp before the season starts.",
    },
    {
      id: 13,
      title: "Cycling: 'Pedal for Peace' rally on Sunday",
      posted: "3w ago",
      tag: "Cycling",
      fullContent:
        "The 'Pedal for Peace' cycling rally is scheduled for this Sunday morning. The 20km ride will start from Gandhi Statue and end at the river front. \n\n Over 200 cyclists have already registered. The event aims to promote cycling as a healthy and eco-friendly mode of transport.",
    },
    {
      id: 14,
      title: "Basketball: College championship dates",
      posted: "1mo ago",
      tag: "Basketball",
      fullContent:
        "The Inter-Collegiate Basketball Championship will begin from the 15th of next month. Determining the best college team in the district is the goal. \n\n Reigning champions VR College are favorites to retain the title, but strong competition is expected from Narayana Engineering College.",
    },
  ],

  // Pagination State for Sports News
  sportsNewsPage: {
    currentPage: 1,
    itemsPerPage: 4,
  },

  // News Lines
  newsLines: [
    {
      id: 1,
      text: "Cricket: Rain delay expected at Municipal Ground",
    },
    {
      id: 2,
      text: "Volleyball qualifiers day-2 schedule updated",
    },
    {
      id: 3,
      text: "Marathon bib distribution from Friday 10 AM",
    },
  ],

  // Standings
  standings: {
    league: "School Cricket League",
    teams: [
      {
        id: 1,
        name: "Nellore Titans",
        played: 6,
        points: 10,
      },
      {
        id: 2,
        name: "Gudur Warriors",
        played: 6,
        points: 8,
      },
      {
        id: 3,
        name: "Sullur Stars",
        played: 6,
        points: 6,
      },
      {
        id: 4,
        name: "Kovur Kings",
        played: 6,
        points: 4,
      },
    ],
  },

  // Sponsored Content
  sponsored: {
    title: "Buy Sports Gear - Local Stores",
    tags: ["Cricket", "Volleyball", "Running"],
    action: "Explore Offers",
  },

  // Active filters
  activeFilters: {
    category: "All",
    region: "All",
  },
};

const sportsSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeFilters.category = action.payload;
    },
    setActiveRegion: (state, action) => {
      state.activeFilters.region = action.payload;
    },
    resetFilters: (state) => {
      state.activeFilters = {
        category: "All",
        region: "All",
      };
    },
    setSportsNewsPage: (state, action) => {
      state.sportsNewsPage.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Fixtures
    builder.addCase(getFixtures.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getFixtures.fulfilled, (state, action) => {
      state.status = "succeeded";
      // normalize data
      let items = [];
      if (Array.isArray(action.payload)) {
        items = action.payload;
      } else if (action.payload && Array.isArray(action.payload.data)) {
        items = action.payload.data;
      }
      state.upcomingFixtures = items;
    });
    builder.addCase(getFixtures.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      // Fallback
      if (state.upcomingFixtures.length === 0) {
        state.upcomingFixtures = state.mockUpcomingFixtures;
      }
    });

    // Get Match Results (Populates liveScores for demo purposes, or a separate list)
    builder.addCase(getMatchResults.fulfilled, (state, action) => {
      // Assume match results might double as live scores if marked 'isLive'
      // For integration, let's populate liveScores with appropriate data from response
      let items = [];
      if (Array.isArray(action.payload)) {
        items = action.payload;
      } else if (action.payload && Array.isArray(action.payload.data)) {
        items = action.payload.data;
      }
      state.liveScores = items.length > 0 ? items : state.mockLiveScores; // fallback if empty array returned from API?
    });
    builder.addCase(getMatchResults.rejected, (state) => {
      if (state.liveScores.length === 0) {
        state.liveScores = state.mockLiveScores;
      }
    });

    builder.addCase(getMatchResult.fulfilled, (state, action) => {
      state.currMatchResult = action.payload;
    });

    // Create Actions
    builder.addCase(createFixture.fulfilled, (state, action) => {
      if (action.payload) state.upcomingFixtures.push(action.payload);
    });
    builder.addCase(createMatchResult.fulfilled, (state, action) => {
      if (action.payload) state.liveScores.push(action.payload);
    });
  },
});

export const setSportsCategory = sportsSlice.actions.setActiveCategory;
export const setSportsRegion = sportsSlice.actions.setActiveRegion;
export const resetSportsFilters = sportsSlice.actions.resetFilters;
export const setSportsNewsPage = sportsSlice.actions.setSportsNewsPage;


export default sportsSlice.reducer;
