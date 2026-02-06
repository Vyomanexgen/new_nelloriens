import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonAds from "../../components/CommonAds/CommonAds";
import CommonPageLayout from "../../components/CommonPageLayout";
import Pagination from "../../components/Pagination";
import useTranslation from "../../hooks/useTranslation";
import {
  fetchTransportDetail,
  fetchTransports,
} from "../../state/slices/transportSlice";
import LiveTrackingModal from "./LiveTrackingModal";
import TransportCard from "./TransportCard";
import TransportFilters from "./TransportFilters";
import "./TransportPage.css";
import TransportSearchSection from "./TransportSearchSection";

// Reducer for managing Transport Page State
const initialState = {
  searchResults: [],
  isLoading: false,
  hasSearched: false,
  filters: {
    transportTypes: ["bus", "train", "metro"],
    priceRange: "all",
    departureTime: [],
  },
  searchParams: {
    source: "",
    destination: "",
    date: "",
  },
  currentPage: 1,
  itemsPerPage: 6,
};

const transportReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        isLoading: true,
        hasSearched: true,
        searchParams: action.payload,
        currentPage: 1,
      };
    case "SEARCH_SUCCESS":
      return { ...state, isLoading: false, searchResults: action.payload };
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1,
      };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const TransportPage = () => {
  const { t } = useTranslation();
  // Keep local reducer for UI state (search params, filters, pagination) if desired,
  // OR fully move to Redux. For "same code pattern" as other pages (News, Results),
  // typically we use Redux for data.
  // But given complex local reducer here, I'll keep it for UI state but feed it with API data.

  const reduxDispatch = useDispatch(); // Rename to avoid conflict with local dispatch
  const { transports = [], status } = useSelector(
    (state) => state.transport || {},
  );

  // We need to initialize local state default results? Or update them when API returns?
  // Let's modify SEARCH_SUCCESS to take payload from API or filter it.

  const [state, dispatch] = useReducer(transportReducer, initialState);

  useEffect(() => {
    if (status === "idle") {
      reduxDispatch(fetchTransports());
    }
  }, [reduxDispatch, status]);

  // UI State for Modals
  const [selectedItem, setSelectedItem] = useState(null); // Preview Modal
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false); // Live Tracking Modal
  const [liveData, setLiveData] = useState(null);
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [trackingTrainInfo, setTrackingTrainInfo] = useState(null);

  // Simulated API Call / Search Logic using loaded data
  const handleSearch = (params) => {
    dispatch({ type: "SEARCH_START", payload: params });

    // Simulate delay then filter loaded transports
    setTimeout(() => {
      // If transports are loaded from API, use them.
      // If not (e.g. search specific), we might need to filter `transports` array locally.

      // For integration: Map API data to results
      // Assuming API returns mixed list.
      // Ensure transports is an array
      const safeTransports = Array.isArray(transports) ? transports : [];
      // Search logic (simplified for now to just return all if no specific backend search)
      const results = safeTransports;

      dispatch({
        type: "SEARCH_SUCCESS",
        payload: results.length > 0 ? results : safeTransports,
      });
    }, 1000);
  };

  const handleFilterChange = (key, value) => {
    dispatch({ type: "UPDATE_FILTERS", payload: { [key]: value } });
  };

  const handlePageChange = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Action Handlers
  const handlePreview = async (item) => {
    setSelectedItem(item);

    if (item.id) {
      try {
        const resultAction = await reduxDispatch(fetchTransportDetail(item.id));
        if (fetchTransportDetail.fulfilled.match(resultAction)) {
          setSelectedItem(() => ({ ...item, ...resultAction.payload }));
        }
      } catch (e) {
        console.error("Failed to fetch transport details", e);
      }
    }
  };

  const handleBook = (item) => {
    alert(
      `Booking initiated for ${item.operator || item.name || item.route}. Proceeding to payment...`,
    );
  };

  // --- Live Tracking Logic (Simulated) ---
  const handleTrack = (item) => {
    setIsTrackingLoading(true);
    setTrackingTrainInfo({
      name: item.operator || item.name || "Vehicle",
      number: item.id || item.number,
    });
    setIsLiveModalOpen(true);

    // Simulate Network Delay
    setTimeout(() => {
      let mockData = {};
      const now = new Date();

      if (item.category === "train") {
        mockData = {
          statusSummary: "RUNNING ON TIME",
          overallDelayMinutes: 2,
          currentLocation: {
            stationCode: "Venkatachalam",
            latitude: 14.3,
            longitude: 79.9,
          },
          lastUpdatedAt: now.toISOString(),
          route: [
            {
              stationCode: "Nellore South",
              actualDeparture: new Date(now - 15 * 60000).toISOString(),
              scheduledDeparture: new Date(now - 17 * 60000).toISOString(),
              delayDepartureMinutes: 2,
            },
            {
              stationCode: "Vedayapalem",
              actualDeparture: new Date(now - 30 * 60000).toISOString(),
              scheduledDeparture: new Date(now - 30 * 60000).toISOString(),
              delayDepartureMinutes: 0,
            },
          ],
        };
      } else if (item.category === "bus") {
        mockData = {
          statusSummary: "ON HIGHWAY",
          overallDelayMinutes: 5,
          currentLocation: {
            stationCode: "Nellore Bypass",
            latitude: 14.4426,
            longitude: 79.9865,
          },
          lastUpdatedAt: now.toISOString(),
          route: [
            {
              stationCode: "Indukurpet",
              actualDeparture: new Date(now - 30 * 60000).toISOString(),
              scheduledDeparture: new Date(now - 35 * 60000).toISOString(),
              delayDepartureMinutes: 5,
            },
            {
              stationCode: "Kovur",
              actualDeparture: new Date(now - 60 * 60000).toISOString(),
              scheduledDeparture: new Date(now - 60 * 60000).toISOString(),
              delayDepartureMinutes: 0,
            },
          ],
        };
      } else {
        // Metro
        mockData = {
          statusSummary: "IN TRANSIT",
          overallDelayMinutes: 0,
          currentLocation: {
            stationCode: "VRC Centre",
            latitude: 14.45,
            longitude: 79.99,
          },
          lastUpdatedAt: now.toISOString(),
          route: [
            {
              stationCode: "RTC Bus Stand",
              actualDeparture: new Date(now - 5 * 60000).toISOString(),
              scheduledDeparture: new Date(now - 5 * 60000).toISOString(),
              delayDepartureMinutes: 0,
            },
          ],
        };
      }

      setLiveData(mockData);
      setIsTrackingLoading(false);
    }, 1000);
  };

  const closePreview = () => setSelectedItem(null);
  const closeLiveModal = () => {
    setIsLiveModalOpen(false);
    setLiveData(null);
  };

  // Filter Logic (Same as before)
  const safeSearchResults = Array.isArray(state.searchResults)
    ? state.searchResults
    : [];
  const filteredResults = safeSearchResults.filter((item) => {
    if (!state.filters.transportTypes.includes(item.category)) return false;

    if (state.filters.priceRange !== "all") {
      const p =
        item.price && typeof item.price === "object"
          ? item.price["SL"] || Object.values(item.price)[0]
          : item.price;
      if (state.filters.priceRange === "low" && p >= 200) return false;
      if (state.filters.priceRange === "mid" && (p < 200 || p > 500))
        return false;
      if (state.filters.priceRange === "high" && p <= 500) return false;
    }

    if (state.filters.departureTime && state.filters.departureTime.length > 0) {
      let hour = 0;
      const timeStr = item.departureTime || item.frequency;
      if (item.category === "metro") return true;

      const isPM = timeStr.includes("PM");
      const h = parseInt(timeStr.split(":")[0]);
      hour = (h === 12 ? 0 : h) + (isPM ? 12 : 0);

      let matches = false;
      if (
        state.filters.departureTime.includes("morning") &&
        hour >= 6 &&
        hour < 12
      )
        matches = true;
      if (
        state.filters.departureTime.includes("afternoon") &&
        hour >= 12 &&
        hour < 18
      )
        matches = true;
      if (
        state.filters.departureTime.includes("evening") &&
        (hour >= 18 || hour < 6)
      )
        matches = true;

      if (!matches) return false;
    }

    return true;
  });

  const totalItems = filteredResults.length;
  const paginatedResults = filteredResults.slice(
    (state.currentPage - 1) * state.itemsPerPage,
    state.currentPage * state.itemsPerPage,
  );

  // Render Preview Modal
  const renderPrevModal = () => {
    if (!selectedItem) return null;
    const item = selectedItem;

    return (
      <div className="transport-modal-overlay" onClick={closePreview}>
        <div
          className="transport-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={closePreview}>
            &times;
          </button>

          <div className="modal-header">
            <h3 className="modal-title">
              {item.operator || item.name || "Metro Details"}
            </h3>
            <p className="text-muted mb-0">
              {item.category === "bus"
                ? item.type
                : item.category === "train"
                  ? `${item.number}`
                  : item.route}
            </p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Itinerary</div>
            <div className="d-flex justify-content-between mb-2">
              <span>
                <strong>From:</strong> {item.from || "Nellore"}
              </span>
              <span>
                <strong>To:</strong> {item.to || "Gudur"}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>
                <strong>Departure:</strong> {item.departureTime}
              </span>
              <span>
                <strong>Arrival:</strong> {item.arrivalTime}
              </span>
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Fare Details</div>
            {item.price && typeof item.price === "object" ? (
              <ul className="list-group">
                {Object.entries(item.price).map(([cls, p]) => (
                  <li
                    key={cls}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {cls} Class
                    <span className="badge bg-primary rounded-pill">₹{p}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="alert alert-success">
                Standard Fare: <strong>₹{item.price || item.fare}</strong>
              </div>
            )}
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Amenities & Info</div>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-light text-dark border">
                <i className="bi bi-wifi"></i> Wifi
              </span>
              <span className="badge bg-light text-dark border">
                <i className="bi bi-phone"></i> Charging Point
              </span>
              <span className="badge bg-light text-dark border">
                <i className="bi bi-snow"></i> AC
              </span>
              <span className="badge bg-light text-dark border">
                <i className="bi bi-info-circle"></i> Status:{" "}
                {item.status || "Scheduled"}
              </span>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button
              className="btn btn-danger btn-lg"
              onClick={() => {
                closePreview();
                handleBook(item);
              }}
            >
              Proceed to Book
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Content with Common Ads
  const sidebarContent = <CommonAds />;

  const mainContent = (
    <div className="transport-page-container">
      {/* Search Section */}
      <TransportSearchSection onSearch={handleSearch} />

      {/* Results Area */}
      {state.isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Searching for best routes...</p>
        </div>
      ) : (
        state.hasSearched && (
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-4 col-12 order-2 order-lg-1 mb-4 mb-lg-0">
              <TransportFilters
                filters={state.filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Result Cards */}
            <div className="col-lg-8 col-12 order-1 order-lg-2">
              {/* Top Transport Mode Tabs */}
              <div className="transport-mode-tabs">
                <button
                  className={`mode-tab ${state.filters.transportTypes.length === 3 ? "active" : ""}`}
                  onClick={() =>
                    handleFilterChange("transportTypes", [
                      "bus",
                      "train",
                      "metro",
                    ])
                  }
                >
                  <i className="bi bi-grid-fill"></i> All
                </button>
                <button
                  className={`mode-tab ${state.filters.transportTypes.length === 1 && state.filters.transportTypes.includes("bus") ? "active" : ""}`}
                  onClick={() => handleFilterChange("transportTypes", ["bus"])}
                >
                  <i className="bi bi-bus-front-fill"></i> Bus
                </button>
                <button
                  className={`mode-tab ${state.filters.transportTypes.length === 1 && state.filters.transportTypes.includes("train") ? "active" : ""}`}
                  onClick={() =>
                    handleFilterChange("transportTypes", ["train"])
                  }
                >
                  <i className="bi bi-train-front-fill"></i> Train
                </button>
                <button
                  className={`mode-tab ${state.filters.transportTypes.length === 1 && state.filters.transportTypes.includes("metro") ? "active" : ""}`}
                  onClick={() =>
                    handleFilterChange("transportTypes", ["metro"])
                  }
                >
                  <i className="bi bi-train-lightrail-front"></i> Metro
                </button>
              </div>

              <div className="results-header-bar">
                <span className="results-count">
                  {state.searchParams.source || "Nellore"}{" "}
                  <i className="bi bi-arrow-right"></i>{" "}
                  {state.searchParams.destination || "Destination"}
                </span>
                <span className="text-muted">
                  {filteredResults.length} Results found
                </span>
              </div>

              {paginatedResults.length > 0 ? (
                <>
                  <div className="transport-results-list">
                    {paginatedResults.map((item) => (
                      <TransportCard
                        key={item.id}
                        data={item}
                        type={item.category}
                        onPreview={handlePreview}
                        onBook={handleBook}
                        onTrack={handleTrack}
                      />
                    ))}
                  </div>

                  <Pagination
                    currentPage={state.currentPage}
                    totalItems={totalItems}
                    itemsPerPage={state.itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center p-5 bg-white rounded shadow-sm">
                  <i
                    className="bi bi-search"
                    style={{ fontSize: "2rem", color: "#dee2e6" }}
                  ></i>
                  <h5 className="mt-3">No results found</h5>
                  <p className="text-muted">
                    Try changing your search parameters or check filter settings
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      )}

      {!state.hasSearched && (
        <div className="text-center py-5 text-muted">
          <i
            className="bi bi-map"
            style={{ fontSize: "3rem", opacity: 0.5 }}
          ></i>
          <p className="mt-3">
            Enter your location and destination to see available transport.
          </p>
        </div>
      )}

      {/* Modals */}
      {renderPrevModal()}

      <LiveTrackingModal
        isOpen={isLiveModalOpen}
        onClose={closeLiveModal}
        liveData={liveData}
        isLoading={isTrackingLoading}
        trainInfo={trackingTrainInfo}
      />
    </div>
  );

  return (
    <CommonPageLayout
      pageTitle={t("Transport")}
      pageSubtitle="Navigate Nellore with ease - Buses, Trains, and Metro"
      pageIcon="bi bi-bus-front"
      mainContent={mainContent}
      sidebarContent={sidebarContent}
    />
  );
};

export default TransportPage;
