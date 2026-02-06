const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: "*" });
const { db, admin } = require("./db");

// Firestore Collection
const adsCollection = db.collection("ads");

/*
=====================================
 CREATE AD
 POST -> /createAd
=====================================
*/
exports.createAd = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const {
        name,
        advertiser,
        destinationUrl,
        adType,
        ctaLabel,
        shortDescription,
        createdBy,
      } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const adData = {
        name,
        advertiser: advertiser || "",
        destinationUrl: destinationUrl || "",
        adType: adType || "image",
        ctaLabel: ctaLabel || "",
        shortDescription: shortDescription || "",
        status: "draft",
        createdBy: createdBy || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await adsCollection.add(adData);

      return res.status(201).json({
        success: true,
        id: docRef.id,
        message: "Ad created successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});

/*
=====================================
 GET ALL ADS
 GET -> /getAds
=====================================
*/
exports.getAds = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await adsCollection.orderBy("createdAt", "desc").get();

      const ads = [];

      snapshot.forEach((doc) => {
        ads.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return res.json({
        success: true,
        data: ads,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch ads" });
    }
  });
});

/*
=====================================
 GET SINGLE AD
 GET -> /getAdById?id=AD_ID
=====================================
*/
exports.getAdById = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Ad ID is required" });
      }

      const doc = await adsCollection.doc(id).get();

      if (!doc.exists) {
        return res.status(404).json({ error: "Ad not found" });
      }

      return res.json({
        success: true,
        data: {
          id: doc.id,
          ...doc.data(),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch ad" });
    }
  });
});

/*
=====================================
 UPDATE AD
 PUT/PATCH -> /updateAd?id=AD_ID
=====================================
*/
exports.updateAd = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Ad ID is required" });
      }

      const updateData = {
        ...req.body,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await adsCollection.doc(id).update(updateData);

      return res.json({
        success: true,
        message: "Ad updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Update failed" });
    }
  });
});

/*
=====================================
 DELETE AD
 DELETE -> /deleteAd?id=AD_ID
=====================================
*/
exports.deleteAd = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Ad ID is required" });
      }

      await adsCollection.doc(id).delete();

      return res.json({
        success: true,
        message: "Ad deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Delete failed" });
    }
  });
});
