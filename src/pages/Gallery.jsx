import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("artworks")) || [];
    setArtworks(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = [...artworks];
    updated.splice(index, 1);
    localStorage.setItem("artworks", JSON.stringify(updated));
    setArtworks(updated);
  };

  const goTo3DView = (url) => {
    navigate(`/viewer?model=${encodeURIComponent(url)}`);
  };

  return (
    <div className="min-h-screen p-6 bg-[url('/wood-texture.jpg')] bg-cover bg-center">
      <h1 className="text-3xl font-bold mb-6 text-white text-center drop-shadow">🖼️ Galéria</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {artworks.map((art, idx) => (
          <div key={idx} className="bg-white/90 p-4 rounded-lg shadow-lg text-center border-4 border-yellow-700">
            {art.type === "3d" ? (
              <>
                <p className="text-md text-gray-800 mb-2 font-bold">{art.title} (3D)</p>
                <button
                  onClick={() => goTo3DView(art.file)}
                  className="mt-2 mr-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  3D nézet
                </button>
              </>
            ) : (
              <>
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-40 object-cover rounded mb-2 border border-yellow-800"
                />
                <h2 className="text-lg font-semibold text-gray-800">{art.title}</h2>
                <p className="text-sm text-gray-600">{art.artist}</p>
              </>
            )}

            {user && user.email === art.email && (
              <button
                onClick={() => handleDelete(idx)}
                className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Törlés
              </button>
            )}
          </div>
        ))}
        {artworks.length === 0 && (
          <p className="text-white col-span-full text-center">Nincs feltöltött tartalom.</p>
        )}
      </div>
    </div>
  );
}
