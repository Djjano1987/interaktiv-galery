// Upload.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file || !title || !artist) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    const is3D = file.name.toLowerCase().endsWith(".glb");
    const artworks = JSON.parse(localStorage.getItem("artworks")) || [];
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (is3D) {
      const formData = new FormData();
      formData.append("model", file);

      try {
        const response = await fetch("http://localhost:3001/upload-glb", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        const newArtwork = {
          title,
          artist,
          email: user?.email || "ismeretlen",
          createdAt: new Date(),
          type: "3d",
          file: data.filePath, // pl.: "/models/model.glb"
        };

        localStorage.setItem("artworks", JSON.stringify([...artworks, newArtwork]));
        alert("3D modell feltöltése sikeres!");
        navigate("/gallery");
      } catch (err) {
        console.error("Feltöltési hiba:", err);
        alert("Hiba történt a feltöltés során: " + err.message);
      }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newArtwork = {
          title,
          artist,
          email: user?.email || "ismeretlen",
          createdAt: new Date(),
          type: "2d",
          image: reader.result,
        };

        localStorage.setItem("artworks", JSON.stringify([...artworks, newArtwork]));
        alert("Kép feltöltése sikeres!");
        navigate("/gallery");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">📤 Kép vagy 3D modell feltöltése</h2>
        <input
          type="text"
          placeholder="Cím"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Művész neve"
          className="w-full p-2 border rounded"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,.glb"
          className="w-full p-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Feltöltés
        </button>
      </div>
    </div>
  );
}



