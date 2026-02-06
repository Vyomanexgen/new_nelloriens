import "./TransportPage.css";

const TransportCard = ({ data, type, onPreview, onBook, onTrack }) => {
  if (type === "bus") {
    return (
      <div className="transport-card">
        <div className="card-main-content">
          <div className="operator-info">
            <h4>
              {data.operator}{" "}
              <span className="rating-badge">
                <i className="bi bi-star-fill"></i> {data.rating}
              </span>
            </h4>
            <div className="bus-type">{data.type}</div>
            <div
              className={`status-badge ${data.status && data.status === "Delayed" ? "status-delayed" : "status-running"}`}
            >
              <i
                className={`bi bi-${data.status && data.status === "Delayed" ? "exclamation-triangle" : "broadcast"}`}
              ></i>{" "}
              Live: {data.status}
            </div>
          </div>

          <div className="time-info">
            <div className="time-range">
              {data.departureTime} <i className="bi bi-arrow-right-short"></i>{" "}
              {data.arrivalTime}
            </div>
            <div className="duration-text">{data.duration}</div>
          </div>

          <div className="price-info">
            <div className="price-tag">₹{data.price}</div>
            <div className="seats-info">{data.seatsAvailable} Seats left</div>
            {data.seatsAvailable < 5 && (
              <div className="discount-text">Fast Filling!</div>
            )}
          </div>

          <div className="action-buttons-col">
            <button
              className="book-btn w-100 mb-2"
              onClick={() => onBook(data)}
            >
              SELECT SEATS
            </button>
            <button
              className="preview-btn w-100 mb-2"
              onClick={() => onPreview(data)}
            >
              View Details
            </button>
            <button className="track-btn w-100" onClick={() => onTrack(data)}>
              <i className="bi bi-geo-alt"></i> Track Live
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === "train") {
    return (
      <div className="transport-card">
        <div className="card-main-content">
          <div className="operator-info">
            <h4>
              {data.name}{" "}
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  fontWeight: "normal",
                }}
              >
                ({data.number})
              </span>
            </h4>
            <div
              className={`status-badge ${data.status && data.status.includes("Delayed") ? "status-delayed" : "status-running"}`}
            >
              Live: {data.status}
            </div>
          </div>

          <div className="time-info">
            <div className="time-range">
              {data.departureTime} <i className="bi bi-arrow-right-short"></i>{" "}
              {data.arrivalTime}
            </div>
            <div className="duration-text">
              {data.duration} • {data.runningDays?.join(", ") || "Daily"}
            </div>
          </div>

          <div className="price-info">
            <div className="price-tag">
              ₹{data.price["SL"]} - ₹
              {data.price["2A"] || data.price["3A"] || "-"}
            </div>
            <div className="train-classes">
              {data.price &&
                typeof data.price === "object" &&
                Object.keys(data.price).map((cls) => (
                  <span
                    key={cls}
                    className="train-class-badge"
                    title={`₹${data.price[cls]} - ${data.availability?.[cls] || "Available"}`}
                  >
                    {cls}
                  </span>
                ))}
            </div>
          </div>

          <div className="action-buttons-col">
            <button
              className="book-btn w-100 mb-2"
              onClick={() => onBook(data)}
            >
              Check Availability
            </button>
            <button
              className="preview-btn w-100 mb-2"
              onClick={() => onPreview(data)}
            >
              View Route
            </button>
            <button className="track-btn w-100" onClick={() => onTrack(data)}>
              <i className="bi bi-geo-alt"></i> Track Train
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === "metro") {
    return (
      <div className="transport-card">
        <div className="card-main-content">
          <div className="operator-info">
            <h4>Metro Rail</h4>
            <div className="metro-route">
              <i className="bi bi-sign-turn-right-fill"></i> {data.route}
            </div>
          </div>

          <div className="time-info">
            <div className="time-range">{data.frequency}</div>
            <div className="duration-text">
              {data.estimatedTime} Travel Time
            </div>
          </div>

          <div className="price-info">
            <div className="price-tag">₹{data.fare}</div>
            <div className="seats-info">{data.stops} Stops</div>
          </div>

          <div className="action-buttons-col">
            <button
              className="book-btn w-100 mb-2"
              onClick={() => onBook(data)}
            >
              Buy Ticket
            </button>
            <button
              className="preview-btn w-100 mb-2"
              onClick={() => onPreview(data)}
            >
              Timings
            </button>
            <button className="track-btn w-100" onClick={() => onTrack(data)}>
              <i className="bi bi-map"></i> View Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TransportCard;
