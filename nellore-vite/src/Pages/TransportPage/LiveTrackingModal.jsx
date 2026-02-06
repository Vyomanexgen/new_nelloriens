
import './TransportPage.css';

const LiveTrackingModal = ({ isOpen, onClose, liveData, isLoading, trainInfo }) => {
  if (!isOpen) return null;

  // Helper to format timestamps
  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDelayColor = (delay) => {
    if (delay > 15) return 'text-danger';
    if (delay > 5) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="transport-modal-overlay" onClick={onClose}>
      <div className="transport-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>

        <div className="modal-header">
          <h3 className="modal-title">
            <i className="bi bi-broadcast text-danger live-blink"></i> Live Status
          </h3>
          <p className="text-muted mb-0">
             {trainInfo?.name} ({trainInfo?.number})
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
             <div className="spinner-border text-primary" role="status"></div>
             <p className="mt-2 text-muted">Contacting Satellite...</p>
          </div>
        ) : liveData ? (
           <div className="live-status-container">
              {/* Status Summary Card */}
              <div className="status-summary p-3 bg-light rounded mb-4 border-start border-4 border-primary">
                 <h5 className="mb-2">CURRENT STATUS</h5>
                 <p className="lead fw-bold mb-1">
                    {liveData.statusSummary || liveData.status || "Status Unavailable"}
                 </p>
                 <p className={`mb-0 fw-semibold ${getDelayColor(liveData.overallDelayMinutes)}`}>
                    Delay: {liveData.overallDelayMinutes || 0} mins
                 </p>
              </div>

              {/* Current Location Details */}
              {liveData.currentLocation && (
                  <div className="current-location mb-4">
                     <div className="d-flex align-items-center gap-3">
                        <div className="location-icon-box">
                           <i className="bi bi-geo-alt-fill text-primary fs-3"></i>
                        </div>
                        <div>
                           <div className="text-muted small">Current Location</div>
                           <h5 className="mb-0">
                              {liveData.currentLocation.stationCode || "In Transit"}
                           </h5>
                           <small>Lat: {liveData.currentLocation.latitude}, Lng: {liveData.currentLocation.longitude}</small>
                        </div>
                     </div>
                  </div>
              )}

              {/* Recent Updates / Route Snippet */}
              {liveData.route && liveData.route.length > 0 && (
                <div className="live-timeline">
                   <h6 className="text-uppercase text-muted mb-3 small fw-bold">Recent Updates</h6>
                   <div className="timeline-items">
                      {liveData.route.slice(-3).reverse().map((stop, idx) => (
                         <div key={idx} className={`timeline-item ${stop.actualDeparture ? 'completed' : 'pending'}`}>
                            <div className="timeline-time">
                               {formatTime(stop.actualDeparture || stop.scheduledDeparture)}
                            </div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                               <strong>{stop.stationCode}</strong>
                               <div className="small text-muted">
                                  Sch: {formatTime(stop.scheduledDeparture)}
                               </div>
                               {stop.delayDepartureMinutes > 0 && (
                                  <span className="badge bg-danger">+{stop.delayDepartureMinutes}m Late</span>
                               )}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              )}

              <div className="last-updated mt-3 text-end text-muted small">
                 Updated: {formatTime(liveData.lastUpdatedAt)}
              </div>
           </div>
        ) : (
           <div className="text-center py-5 text-muted">
              <i className="bi bi-exclamation-circle fs-1 mb-2"></i>
              <p>Unable to fetch live status for this vehicle at the moment.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default LiveTrackingModal;
