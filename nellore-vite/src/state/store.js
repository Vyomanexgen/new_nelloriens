import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import articlesReducer from "./slices/articlesSlice";
import commonAdsReducer from "./slices/commonAdsSlice";
import contactReducer from "./slices/contactSlice";
import eventsReducer from "./slices/eventsSlice";
import famousFoodsReducer from "./slices/famousFoodsSlice";
import famousStaysReducer from "./slices/famousStaysSlice";
import historyReducer from "./slices/historySlice";
import homepageReducer from "./slices/homepageSlice";
import mediaReducer from "./slices/mediaSlice";
import moviesReducer from "./slices/moviesSlice";
import newsReducer from "./slices/newsSlice";
import notificationReducer from "./slices/notificationSlice";
import offersReducer from "./slices/offersSlice";
import resultsReducer from "./slices/resultsSlice";
import sportsReducer from "./slices/sportsSlice";
import transportReducer from "./slices/transportSlice";

const loggerMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/pending")) {
    console.log(
      `%c[API REQUEST] ${action.type}`,
      "color: blue; font-weight: bold;",
      action.meta,
    );
  } else if (action.type.endsWith("/fulfilled")) {
    console.log(
      `%c[API SUCCESS] ${action.type}`,
      "color: green; font-weight: bold;",
      action.payload,
    );
  } else if (action.type.endsWith("/rejected")) {
    console.log(
      `%c[API ERROR] ${action.type}`,
      "color: red; font-weight: bold;",
      action.payload || action.error,
    );
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    app: appReducer,
    news: newsReducer,
    homepage: homepageReducer,
    results: resultsReducer,
    notifications: notificationReducer,
    famousStays: famousStaysReducer,
    famousFoods: famousFoodsReducer,
    events: eventsReducer,
    sports: sportsReducer,
    articles: articlesReducer,
    history: historyReducer,
    commonAds: commonAdsReducer,
    contact: contactReducer,
    transport: transportReducer,
    movies: moviesReducer,
    offers: offersReducer,
    media: mediaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
