const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const { admin } = require("./db");
const { v4: uuidv4 } = require("uuid");

const bucket = admin.storage().bucket();

exports.uploadMedia = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { fileName, base64File, folder } = req.body;

      if (!base64File) {
        return res.status(400).json({ error: "base64File is required" });
      }

      const uploadFolder = folder || "uploads";
      const uniqueId = uuidv4();
      const finalFileName = fileName
        ? `${uploadFolder}/${uniqueId}-${fileName}`
        : `${uploadFolder}/${uniqueId}.jpg`;

      const buffer = Buffer.from(base64File, "base64");

      const file = bucket.file(finalFileName);
      await file.save(buffer, {
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uniqueId,
          },
        },
      });

      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
        }/o/${encodeURIComponent(finalFileName)}?alt=media&token=${uniqueId}`;

      res.json({ success: true, url: downloadURL, fileName: finalFileName });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message });
    }
  });
});

exports.deleteMedia = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { fileName } = req.body;
      if (!fileName) {
        return res.status(400).json({ error: "fileName is required" });
      }
      await bucket.file(fileName).delete();
      res.json({ success: true });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: err.message });
    }
  });
});

exports.getMediaUrl = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { fileName, token } = req.query;
      if (!fileName || !token) {
        return res.status(400).json({ error: "fileName and token are required" });
      }
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
        }/o/${encodeURIComponent(fileName)}?alt=media&token=${token}`;
      res.json({ success: true, url });
    } catch (err) {
      console.error("Get URL error:", err);
      res.status(500).json({ error: err.message });
    }
  });
});
