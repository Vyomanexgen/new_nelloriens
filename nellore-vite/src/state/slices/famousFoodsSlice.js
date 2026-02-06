import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const fetchFamousFoods = createAsyncThunk(
  "famousFoods/fetchFamousFoods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/famousFoods-getFamousFoods`);
      if (!response.ok) throw new Error("Failed to fetch famous foods");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createFamousFood = createAsyncThunk(
  "famousFoods/createFamousFood",
  async (newFood, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/famousFoods-createFamousFood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFood),
      });
      if (!response.ok) throw new Error("Failed to create famous food");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFamousFoodDetail = createAsyncThunk(
  "famousFoods/fetchFamousFoodDetail",
  async (foodId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/famousFoods-getFamousFoodDetail?id=${foodId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch famous food detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  signatureDishes: [], // Will be populated by API
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  currentFoodDetail: null,
  // Keep mock data for fallback if needed, or remove if API is strictly used.
  // For now, I'm setting signatureDishes to empty array, assuming API will fill it.
  // If fallback is needed, we can keep the below array attached to a different key or use it on failure.
  mockSignatureDishes: [
    {
      id: 1,
      name: "Nellore Chepala Pulusu",
      description: "Tangy fish curry with regional spices",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 2,
      name: "Gongura Chicken",
      description: "Spicy sorrel-based chicken curry",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 3,
      name: "Andhra Meals",
      description: "Traditional thali on banana leaf",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
      actionLabel: "Popular spots",
      category: "Veg",
    },
    {
      id: 4,
      name: "Mirchi Bajji",
      description: "Crispy stuffed chili fritters",
      tag: "Street",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d3a9?w=400",
      actionLabel: "Map",
      category: "Street",
    },
    {
      id: 5,
      name: "Malai Kaja",
      description: "Famous layered sweet delicacy of Nellore",
      tag: "Sweet",
      image:
        "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400",
      actionLabel: "Where to buy",
      category: "Sweets",
    },
    {
      id: 6,
      name: "Pot Biryani",
      description: "Aromatic biryani cooked in clay pots",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1631515243349-e060360a0c77?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 7,
      name: "Bobbatlu",
      description: "Sweet stuffed flatbread (Puran Poli)",
      tag: "Sweet",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Where to buy",
      category: "Sweets",
    },
    {
      id: 8,
      name: "Pulihora",
      description: "Tangy tamarind rice with peanuts",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1647248197771-464879309990?w=400",
      actionLabel: "Where to eat",
      category: "Veg",
    },
    {
      id: 9,
      name: "Prawns Iguru",
      description: "Spicy thick prawn curry",
      tag: "Non-Veg",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
      actionLabel: "Top spots",
      category: "Non-Veg",
    },
    {
      id: 10,
      name: "Alasanda Vada",
      description: "Crispy black-eyed bean fritters",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1605335777134-5aa46338ac62?w=400",
      actionLabel: "Snack points",
      category: "Veg",
    },
    {
      id: 11,
      name: "Royyala Vepudu",
      description: "Spicy Prawn Fry",
      tag: "Non-Veg",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 12,
      name: "Crab Masala",
      description: "Ulavacharu style spicy crab curry",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
      actionLabel: "Top spots",
      category: "Non-Veg",
    },
    {
      id: 13,
      name: "Gongura Mutton",
      description: "Tangy sorrel leaves with tender mutton",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 14,
      name: "Natu Kodi Pulusu",
      description: "Traditional Country Chicken Curry",
      tag: "Non-Veg",
      image: "https://images.unsplash.com/photo-1602052825000-qwe123?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 15,
      name: "Ulavacharu",
      description: "Traditional Horse gram soup",
      tag: "Veg",
      image: "https://images.unsplash.com/photo-1547496502-8438393dc6eb?w=400",
      actionLabel: "Popular spots",
      category: "Veg",
    },
    {
      id: 16,
      name: "Ulavacharu Biryani",
      description: "Biryani infused with Horse gram soup",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d3a9?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 17,
      name: "Pesarattu",
      description: "Green gram dosa served with chutney",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1630384060421-cb20d0e06497?w=400",
      actionLabel: "Breakfast spots",
      category: "Veg",
    },
    {
      id: 18,
      name: "Upma Pesarattu",
      description: "Green gram dosa stuffed with savory Upma",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1630384060421-cb20d0e06497?w=400",
      actionLabel: "Breakfast spots",
      category: "Veg",
    },
    {
      id: 19,
      name: "Gongura Pachadi",
      description: "Traditional Sorrel leaves pickle",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Where to buy",
      category: "Veg",
    },
    {
      id: 20,
      name: "Avakaya",
      description: "Spicy Mango Pickle from Andhra",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
      actionLabel: "Where to buy",
      category: "Veg",
    },
    {
      id: 21,
      name: "Nellore Fish Fry",
      description: "Crispy local style fish fry",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
      actionLabel: "Top spots",
      category: "Non-Veg",
    },
    {
      id: 22,
      name: "Ragi Sangati",
      description: "Finger millet ball with Natukodi Pulusu",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1647248197771-464879309990?w=400",
      actionLabel: "Where to eat",
      category: "Non-Veg",
    },
    {
      id: 23,
      name: "Kodi Vepudu",
      description: "Spicy Andhra-style Chicken Fry",
      tag: "Non-Veg",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
      actionLabel: "Top spots",
      category: "Non-Veg",
    },
    {
      id: 24,
      name: "Kakarakaya Fry",
      description: "Crispy Bitter gourd fry",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1647248197771-464879309990?w=400",
      actionLabel: "Lunch spots",
      category: "Veg",
    },
    {
      id: 25,
      name: "Bendakaya Fry",
      description: "Nellore style Okra fry",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1605335777134-5aa46338ac62?w=400",
      actionLabel: "Lunch spots",
      category: "Veg",
    },
    {
      id: 26,
      name: "Minapa Garelu",
      description: "Traditional Medu Vada",
      tag: "Veg",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Breakfast spots",
      category: "Veg",
    },
    {
      id: 27,
      name: "Poornam Boorelu",
      description: "Sweet stuffed rice flour dumplings",
      tag: "Sweet",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Sweets",
      category: "Sweets",
    },
    {
      id: 28,
      name: "Ariselu",
      description: "Traditional rice and jaggery sweet",
      tag: "Sweet",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Where to buy",
      category: "Sweets",
    },
    {
      id: 29,
      name: "Bellam Gavvalu",
      description: "Shell shaped sweet dough shells",
      tag: "Sweet",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Where to buy",
      category: "Sweets",
    },
    {
      id: 30,
      name: "Pala Pindi",
      description: "Traditional sweet powder",
      tag: "Sweet",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Where to buy",
      category: "Sweets",
    },
    {
      id: 31,
      name: "Payasam",
      description: "Bellam / Rice Payasam",
      tag: "Sweet",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      actionLabel: "Dessert spots",
      category: "Sweets",
    },
  ],

  todaysSpecials: [
    {
      id: 1,
      name: "Spicy Gongura Thali",
      details: "Lunch only - Old Town",
      label: "Popular",
      icon: "bi-hand-thumbs-up",
    },
    {
      id: 2,
      name: "Millet Meals",
      details: "Healthy pick - East Street",
      label: "New",
      icon: "bi-leaf",
    },
  ],

  topRatedSpots: [
    {
      id: 1,
      name: "Coastal Spice",
      description: "Seafood specialist",
      rating: 4.6,
      icon: "bi-star-fill",
    },
    {
      id: 2,
      name: "Guntur House",
      description: "Spicy Andhra meals",
      rating: 4.5,
      icon: "bi-star-fill",
    },
  ],

  commonAds: [
    {
      id: 1,
      title: "Grand Restaurant Opening",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      actionLabel: "View offer",
    },
    {
      id: 2,
      title: "50% Off on Delivery",
      subtitle: "ORDER FOOD & BEER HERE",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      actionLabel: "Order now",
    },
  ],

  editorsPicks: [
    {
      id: 1,
      title: "Best Fish Curry Places",
      subtitle: "Harbour side shacks · Family restaurants",
      icon: "bi-geo-alt-fill",
      actionLabel: "Guide",
    },
    {
      id: 2,
      title: "Evening Chai & Snacks Trail",
      subtitle: "Samosa, bajji, and filter coffee",
      icon: "bi-basket",
      actionLabel: "Trail",
    },
    {
      id: 3,
      title: "Dessert Spots",
      subtitle: "Kulfi, falooda, fruit custard",
      icon: "bi-ice-cream",
      actionLabel: "List",
    },
  ],

  foodTourPlan: {
    date: "",
    peopleCount: "",
  },

  filters: {
    category: "All", // All, Veg, Non-Veg, Sweets
    location: "Nellore - Gudur",
  },

  foodsPage: {
    currentPage: 1,
    totalPages: 5,
    isLoading: false,
  },
};

const famousFoodsSlice = createSlice({
  name: "famousFoods",
  initialState,
  reducers: {
    setFoodsPage: (state, action) => {
      state.foodsPage.currentPage = action.payload;
    },
    setFoodsLoading: (state, action) => {
      state.foodsPage.isLoading = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateFoodTourPlan: (state, action) => {
      state.foodTourPlan = { ...state.foodTourPlan, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamousFoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFamousFoods.fulfilled, (state, action) => {
        state.status = "succeeded";
        let items = [];
        if (Array.isArray(action.payload)) {
          items = action.payload;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          items = action.payload.data;
        }
        state.signatureDishes = items.map((item) => ({
          ...item,
          // Ensure necessary fields exist, map if backend names differ
          id: item.id || Math.random().toString(36).substr(2, 9),
          // Default image if missing from backend
          image:
            item.image ||
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
        }));
      })
      .addCase(fetchFamousFoods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // Fallback to mock data on error if signatureDishes is empty
        if (state.signatureDishes.length === 0) {
          state.signatureDishes = state.mockSignatureDishes;
        }
      })
      .addCase(createFamousFood.fulfilled, (state, action) => {
        // Optimistically add
        if (action.payload) {
          state.signatureDishes.unshift(action.payload);
        }
      })
      .addCase(fetchFamousFoodDetail.fulfilled, (state, action) => {
        state.currentFoodDetail = action.payload;
      });
  },
});

export const {
  setFoodsPage,
  setFoodsLoading,
  updateFilters,
  resetFilters,
  updateFoodTourPlan,
} = famousFoodsSlice.actions;
export default famousFoodsSlice.reducer;
