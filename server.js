const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Statikus fájlok kiszolgálása (Vite build output)
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Szerver fut a következő porton: http://localhost:${PORT}`);
});
