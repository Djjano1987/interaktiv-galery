// server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// CORS engedélyezése
app.use(cors());

// Statikus fájlok kiszolgálása a 'public' mappából
app.use(express.static("public"));

// Feltöltési mappa beállítása
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/models";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Végpont a .glb fájl feltöltésére
app.post("/upload-glb", upload.single("model"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Nincs fájl feltöltve." });
  }

  const fullUrl = `http://localhost:${PORT}/models/${req.file.filename}`;

  res.json({
    success: true,
    message: "Fájl sikeresen feltöltve!",
    filePath: fullUrl, // 💡 Ez az, amit a frontend majd betölt a galériában
  });
});

// Indítás
app.listen(PORT, () => {
  console.log(`✅ GLB szerver fut: http://localhost:${PORT}`);
});
