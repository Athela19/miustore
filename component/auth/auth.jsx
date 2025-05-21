"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Login gagal");
        return;
      }

      const data = await res.json();
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Register gagal");
        return;
      }

      const data = await res.json();
      setIsRegister(false);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan saat register");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      await handleRegister({ name, email, password });
    } else {
      await handleLogin({ email, password });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md w-80">
        <h1 className="text-xl font-semibold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 rounded-xl"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded-xl"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary)] text-white p-2 rounded-xl hover:bg-[var(--background)] hover:text-[var(--primary)] border-2 border-[var(--primary)] transition"
          >
            {loading ? "Loading..." : isRegister ? "Register" : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline text-sm"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister
              ? "Sudah punya akun? Login"
              : "Belum punya akun? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
