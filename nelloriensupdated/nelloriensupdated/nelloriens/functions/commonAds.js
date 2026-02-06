const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: "*" });
const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore();
const commonAdsCollection = db.collection("commonAds");

/* =====================================================
   CREATE COMMON AD
===================================================== */
exports.createCommonAd = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {
        title,
        imageUrl,
        ctaText,
        destinationUrl,
        placement,
        status = "active",
      } = req.body || {};

      if (!title || !imageUrl || !destinationUrl) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newAd = {
        title,
        imageUrl,
        ctaText: ctaText || "",
        destinationUrl,
        placement: placement || "site-wide",
        status,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      const docRef = await commonAdsCollection.add(newAd);

      res.json({
        success: true,
        id: docRef.id,
      });
    } catch (err) {
      console.error("❌ Error creating common ad:", err);
      res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  });
});

/* =====================================================
   GET COMMON ADS (FRONTEND-CONTRACT READY)
===================================================== */
exports.getCommonAds = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await commonAdsCollection
        .where("status", "==", "active")
        .orderBy("createdAt", "desc")
        .get();

      const commonAds = [];
      const sponsored = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        const mappedAd = {
          id: doc.id,
          title: data.title,
          image: data.imageUrl, // frontend expects `image`
          buttonText: data.ctaText || "View",
          buttonColor: "blue", // frontend expects this
        };

        if (data.placement === "sponsored") {
          sponsored.push(mappedAd);
        } else {
          commonAds.push(mappedAd);
        }
      });

      res.json({
        success: true,
        commonAds,
        sponsored,
      });
    } catch (err) {
      console.error("❌ Error fetching common ads:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

/* =====================================================
   GET SINGLE COMMON AD
===================================================== */
exports.getCommonAdDetail = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Missing ad id" });
      }

      const doc = await commonAdsCollection.doc(id).get();
      if (!doc.exists) {
        return res.status(404).json({ error: "Common Ad not found" });
      }

      res.json({
        success: true,
        ad: { id: doc.id, ...doc.data() },
      });
    } catch (err) {
      console.error("❌ Error fetching common ad detail:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

/* =====================================================
   UPDATE COMMON AD
===================================================== */
exports.updateCommonAd = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { id, ...updates } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: "Missing ad id" });
      }

      updates.updatedAt = FieldValue.serverTimestamp();
      await commonAdsCollection.doc(id).update(updates);

      res.json({ success: true });
    } catch (err) {
      console.error("❌ Error updating common ad:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

/* =====================================================
   DELETE COMMON AD
===================================================== */
exports.deleteCommonAd = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { id } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: "Missing ad id" });
      }

      await commonAdsCollection.doc(id).delete();
      res.json({ success: true });
    } catch (err) {
      console.error("❌ Error deleting common ad:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

/* =====================================================
   TOGGLE COMMON AD STATUS
===================================================== */
exports.toggleCommonAdStatus = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { id, status } = req.body || {};
      if (!id || !status) {
        return res.status(400).json({ error: "Missing fields" });
      }

      await commonAdsCollection.doc(id).update({
        status,
        updatedAt: FieldValue.serverTimestamp(),
      });

      res.json({ success: true });
    } catch (err) {
      console.error("❌ Error toggling status:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

/* =====================================================
   ALIAS FOR BACKWARD COMPATIBILITY
===================================================== */
exports.getCommonAd = exports.getCommonAdDetail;
