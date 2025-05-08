"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate sending reset email
    setSubmitted(true);
    setError("");
    setTimeout(() => {
      // After "sending", you can redirect or show more info
      console.log("Reset email sent to:", email);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-green-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Forgot Password
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your registered email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#f1f9ff]"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <p className="text-green-700 text-center text-sm">
            ✅ If an account with that email exists, a reset link has been sent.
          </p>
        )}

        <div className="text-center text-sm text-gray-500">
          <a
            href="/"
            className="hover:underline text-green-700 font-medium"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
