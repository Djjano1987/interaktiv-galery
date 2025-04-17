const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Engedélyezzük a CORS-t
app.use(cors());

// Statikus fájlok kiszolgálása (Vite build output mappája)
app.use(express.static(path.join(__dirname, 'dist')));

// Az összes többi útvonalra az index.html-t küldjük (SPA működéshez)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`✅ A szerver elindult: http://localhost:${PORT}`);
});
