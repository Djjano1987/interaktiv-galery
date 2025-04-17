import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate, useLocation } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function ModelViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const modelUrl = params.get("model");

  if (!modelUrl) return <div className="p-10 text-center">Nincs betöltendő modell.</div>;

  return (
    <div className="h-screen w-full relative bg-black">
      <Canvas camera={{ position: [0, 0, 5] }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} castShadow intensity={1} />
        <Model url={modelUrl} />
        <OrbitControls enableZoom={true} />
      </Canvas>
      <button
        onClick={() => navigate("/gallery")}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200"
      >
        Kilépés a galériába
      </button>
    </div>
  );
}
