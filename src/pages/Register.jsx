import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    const hashedPassword = sha256(password);
    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Sikeres regisztráció!");
    navigate("/");
  };

  const sha256 = (str) => {
    const buffer = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", buffer).then((hash) => {
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-sm w-full bg-gray-100 rounded-xl shadow-md p-6 space-y-3">
        <h2 className="text-xl font-semibold text-center mb-2">📝 Regisztráció</h2>
        <input type="text" placeholder="Vezetéknév" className="w-full p-2 border rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Keresztnév" className="w-full p-2 border rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Telefonszám" className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder="Jelszó" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => handleRegister()} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Regisztráció
        </button>
      </div>
    </div>
  );
}
