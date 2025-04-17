const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Statikus fájlok kiszolgálása a Vite buildelt mappából
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());

// Minden más útvonalra az index.html-t adjuk vissza
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Szerver fut a következő porton: http://localhost:${PORT}`);
});
