import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommonAdDetail,
  fetchCommonAds,
} from "../../state/slices/commonAdsSlice";
import "./CommonAds.css";

const CommonAds = () => {
  const dispatch = useDispatch();
  const {
    commonAds = [],
    sponsored = [],
    status,
  } = useSelector((state) => state.commonAds || {});

  /* Modal State */
  const [selectedAd, setSelectedAd] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if we need to fetch.
    // We fetch only if status is idle to avoid infinite loops if API returns empty
    if (status === "idle") {
      dispatch(fetchCommonAds());
    }
  }, [dispatch, status]);

  const handleAdClick = async (ad) => {
    setSelectedAd(ad);
    setShowModal(true);

    if (ad.id) {
      try {
        const resultAction = await dispatch(fetchCommonAdDetail(ad.id));
        if (fetchCommonAdDetail.fulfilled.match(resultAction)) {
          setSelectedAd(() => ({ ...ad, ...resultAction.payload }));
        }
      } catch (e) {
        console.error("Failed to fetch ad details", e);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedAd(null), 300);
  };

  return (
    <div className="sidebar-section common-ads-section">
      <h5 className="sidebar-section-title">Common Ads</h5>
      <div className="ad-cards">
        {commonAds.map((ad) => (
          <div
            key={ad.id}
            className="ad-card"
            onClick={() => handleAdClick(ad)}
            style={{ cursor: "pointer" }}
          >
            <div className="ad-card-image">
              <img
                src={ad.image}
                alt={ad.title}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "#e9ecef";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.parentElement.innerHTML =
                    '<i class="bi bi-card-image text-muted" style="font-size: 2rem;"></i>';
                }}
              />
            </div>
            <div className="ad-card-content">
              <h6 className="ad-card-title">{ad.title}</h6>
              <button
                className={`btn btn-${ad.buttonColor === "blue" ? "primary" : "light"} btn-sm ad-card-button`}
              >
                {ad.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="ad-cards">
        {sponsored.map((ad) => (
          <div
            key={ad.id}
            className="ad-card"
            onClick={() => handleAdClick(ad)}
            style={{ cursor: "pointer" }}
          >
            <div className="ad-card-image">
              <img
                src={ad.image}
                alt={ad.title}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "#e9ecef";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.parentElement.innerHTML =
                    '<i class="bi bi-card-image text-muted" style="font-size: 2rem;"></i>';
                }}
              />
            </div>
            <div className="ad-card-content">
              <h6 className="ad-card-title">{ad.title}</h6>
              {ad.subtitle && <p className="ad-card-subtitle">{ad.subtitle}</p>}
              <button
                className={`btn btn-${ad.buttonColor === "blue" ? "primary" : "light"} btn-sm ad-card-button`}
              >
                {ad.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ad Detail Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        {selectedAd && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedAd.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img
                src={selectedAd.image}
                alt={selectedAd.title}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "250px" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  // Insert a placeholder text or icon after the hidden image
                  const placeholder = document.createElement("div");
                  placeholder.className =
                    "bg-light rounded mb-3 d-flex align-items-center justify-content-center";
                  placeholder.style.height = "200px";
                  placeholder.innerHTML =
                    '<i class="bi bi-image text-muted" style="font-size: 3rem;"></i>';
                  e.target.parentNode.insertBefore(placeholder, e.target);
                }}
              />
              <h5>{selectedAd.subtitle}</h5>
              {selectedAd.details ? (
                <p className="text-muted mt-3">{selectedAd.details}</p>
              ) : (
                <p className="text-muted mt-3">
                  Limited time offer! Check out this amazing deal.
                </p>
              )}
              {selectedAd.promoCode && (
                <div className="alert alert-success mt-3">
                  Promo Code: <strong>{selectedAd.promoCode}</strong>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant={selectedAd.buttonColor === "blue" ? "primary" : "dark"}
              >
                {selectedAd.buttonText || "Learn More"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CommonAds;
