import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const fetchFamousStays = createAsyncThunk(
  "famousStays/fetchFamousStays",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/famousStay-getFamousStays`);
      if (!response.ok) throw new Error("Failed to fetch famous stays");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createFamousStay = createAsyncThunk(
  "famousStays/createFamousStay",
  async (newStay, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/famousStay-createFamousStay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStay),
      });
      if (!response.ok) throw new Error("Failed to create famous stay");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFamousStayDetail = createAsyncThunk(
  "famousStays/fetchFamousStayDetail",
  async (stayId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/famousStay-getFamousStayDetail?id=${stayId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch famous stay detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  topPicks: [], // Will be populated by API
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  currentStayDetail: null,
  // Keep mock data for fallback
  mockTopPicks: [
    {
      id: 1,
      name: "Hotel Grand Peninsula",
      rating: 4.5,
      location: "Near Penna River Bridge",
      price: 2800,
      priceUnit: "night",
      amenities: ["On-site restaurant", "Breakfast", "Free Wi-Fi"],
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      isEditorChoice: true,
      actions: ["Book now", "Save", "Share"],
      fullContent:
        "Experience luxury at Hotel Grand Peninsula, located centrally near the iconic Penna River Bridge. Our hotel offers spacious suites, a multi-cuisine restaurant serving authentic Nellore delicacies, and a rooftop pool with breathtaking city views. \n\n Ideal for business and leisure travelers, we provide 24/7 room service, high-speed Wi-Fi, and a state-of-the-art conference center. Guests rate our complimentary breakfast buffet as the best in town.",
    },
    {
      id: 2,
      name: "Simhapuri Heritage Inn",
      rating: 4.7,
      location: "Old Market, near fort remains",
      price: 3400,
      priceUnit: "night",
      amenities: ["Tea lounge", "Courtyard", "24x7 desk"],
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
      isEditorChoice: true,
      actions: ["Check availability", "Save", "Share"],
      fullContent:
        "Step back in time at Simhapuri Heritage Inn. Nestled near the historic fort remains in the Old Market area, this boutique hotel combines colonial architecture with modern comforts. \n\n Enjoy your evening tea in our lush courtyard, or explore the local spice markets just a walk away. Our rooms feature vintage decor, antique furniture, and premium amenities. The perfect choice for culture enthusiasts.",
    },
    {
      id: 3,
      name: "Riverfront Budget Stay",
      rating: 4.1,
      location: "Penna ghats",
      price: 1200,
      priceUnit: "night",
      amenities: ["Wi-Fi", "Parking"],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400",
      isEditorChoice: false,
      actions: ["Book now", "Save", "Share"],
      fullContent:
        "Riverfront Budget Stay offers clean, comfortable, and affordable accommodation right on the banks of the Penna River. Wake up to the serene sound of flowing water and enjoy a peaceful morning walk on the ghats. \n\n We provide essential amenities including free Wi-Fi, secure parking, and hygiene-certified rooms. Popular among solo travelers and backpackers looking for a scenic yet budget-friendly stopover.",
    },
    {
      id: 4,
      name: "Venkatesa Business Hotel",
      rating: 4.3,
      location: "Near bus stand",
      price: 2000,
      priceUnit: "night",
      amenities: ["Gym", "Wi-Fi"],
      image:
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400",
      isEditorChoice: false,
      actions: ["Book now", "Save", "Share"],
      fullContent:
        "Venkatesa Business Hotel is strategically located near the main bus stand, making it the top choice for transit passengers and business professionals. \n\n Our facility features a modern gym, high-speed internet, and ergonomic workspaces in every room. We also offer express laundry services and a 24-hour coffee shop to keep you fueled throughout your busy day.",
    },
    {
      id: 5,
      name: "Hotel Minerva Grand",
      rating: 4.6,
      location: "Grand Truck Road",
      price: 4500,
      priceUnit: "night",
      amenities: ["Fine Dining", "Bar", "Gym"],
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400",
      isEditorChoice: true,
      actions: ["Book now", "Save", "Share"],
      fullContent:
        "Hotel Minerva Grand sets the standard for hospitality in Nellore. Located on the bustling Grand Truck Road, it offers easy access to the city's commercial hubs. \n\n Indulge in fine dining at our award-winning restaurant 'Blue Fox', unwind at our bar, or maintain your fitness routine at our fully-equipped gym. Our banquet halls are perfect for weddings and corporate events.",
    },
    {
      id: 6,
      name: "D.R. Utthama",
      rating: 4.2,
      location: "Ramesh Reddy Nagar",
      price: 2600,
      priceUnit: "night",
      amenities: ["Conference Hall", "Restaurant", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=400",
      isEditorChoice: false,
      actions: ["Check availability", "Save", "Share"],
      fullContent:
        "D.R. Utthama allows you to experience Nellore in style. Situated in the upscale Ramesh Reddy Nagar, this hotel is known for its quiet ambience and impeccable service. \n\n Amenities include a spacious conference hall, an in-house pure vegetarian restaurant, and valet parking. The rooms are designed with contemporary aesthetics to ensure a relaxing stay.",
    },
    {
      id: 7,
      name: "Hotel Seasons Inn",
      rating: 4.0,
      location: "Near RTC Bus Stand",
      price: 1800,
      priceUnit: "night",
      amenities: ["Parking", "Room Service"],
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
      isEditorChoice: false,
      actions: ["Book now", "Save", "Share"],
      fullContent:
        "Hotel Seasons Inn offers great value for money without compromising on comfort. Located comfortably near the RTC Bus Stand, it serves as an excellent base for exploring Nellore. \n\n We offer spacious rooms with air-conditioning, 24-hour room service, and ample parking space. Our friendly staff is always ready to assist you with travel arrangements and local sightseeing tips.",
    },
    {
      id: 8,
      name: "Kinnera Grand",
      rating: 4.4,
      location: "VRC Centre",
      price: 3200,
      priceUnit: "night",
      amenities: ["Banquet", "Restaurant", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      isEditorChoice: false,
      actions: ["Book now", "Save", "Share"],
      fullContent:
        "Kinnera Grand at VRC Centre is a landmark in Nellore. Known for its grand facade and luxurious interiors, it is a favorite for wedding parties and large groups. \n\n The hotel boasts multiple banquet halls, a multi-cuisine family restaurant, and premium suites. Its central location puts you within walking distance of shopping centers and cinemas.",
    },
  ],

  quickFilters: [
    { id: 1, label: "Price", icon: "bi-currency-rupee" },
    { id: 2, label: "Rating 4.0+", icon: "bi-star-fill" },
    { id: 3, label: "Near landmark", icon: "bi-geo-alt-fill" },
    { id: 4, label: "Free Wi-Fi", icon: "bi-wifi" },
    { id: 5, label: "Breakfast", icon: "bi-cup-hot" },
    { id: 6, label: "Parking", icon: "bi-p-circle" },
  ],

  nearbyFoods: [
    {
      id: 1,
      name: "Nellore Chepala Pulusu",
      description: "Best spots within 2 km",
      label: "Popular",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300",
    },
    {
      id: 2,
      name: "Ulavacharu Biryani",
      description: "Family-friendly places",
      label: "Hot",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300",
    },
  ],

  commonAds: [
    {
      id: 1,
      title: "Weekend Stay Sale",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      actionLabel: "Grab offer",
    },
    {
      id: 2,
      title: "Airport Pickup + Hotel",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
      actionLabel: "Bundle now",
    },
  ],

  mapNearbyFilters: [
    { id: 1, label: "Temples" },
    { id: 2, label: "Food streets" },
    { id: 3, label: "Bus stand" },
  ],

  staysPage: {
    currentPage: 1,
    totalPages: 5,
    isLoading: false,
  },

  filters: {
    priceRange: "All",
    rating: "All",
    nearLandmark: false,
    freeWiFi: false,
    breakfast: false,
    parking: false,
  },
};

const famousStaysSlice = createSlice({
  name: "famousStays",
  initialState,
  reducers: {
    setStaysPage: (state, action) => {
      state.staysPage.currentPage = action.payload;
    },
    setStaysLoading: (state, action) => {
      state.staysPage.isLoading = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamousStays.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFamousStays.fulfilled, (state, action) => {
        state.status = "succeeded";
        let items = [];
        if (Array.isArray(action.payload)) {
          items = action.payload;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          items = action.payload.data;
        }

        state.topPicks = items.map((item) => ({
          ...item,
          id: item.id || Math.random().toString(36).substr(2, 9),
          // Ensure mock-like fields if backend missing them for UI consistency
          image:
            item.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        }));
      })
      .addCase(fetchFamousStays.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // Fallback
        if (state.topPicks.length === 0) {
          state.topPicks = state.mockTopPicks;
        }
      })
      .addCase(createFamousStay.fulfilled, (state, action) => {
        if (action.payload) {
          state.topPicks.unshift(action.payload);
        }
      })
      .addCase(fetchFamousStayDetail.fulfilled, (state, action) => {
        state.currentStayDetail = action.payload;
      });
  },
});

export const { setStaysPage, setStaysLoading, updateFilters, resetFilters } =
  famousStaysSlice.actions;
export default famousStaysSlice.reducer;
