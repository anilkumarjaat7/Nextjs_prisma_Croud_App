"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Crowd App</h1>
          <div className="flex gap-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-indigo-600 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => router.push("/api/auth/signout")}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-600 hover:text-indigo-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Crowd App
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create, share, and manage your posts in a secure environment
          </p>

          {!session && (
            <div className="flex gap-4 justify-center">
              <Link
                href="/signin"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}

          {session && (
            <Link
              href="/dashboard"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-medium inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Create Posts
            </h3>
            <p className="text-gray-600">
              Write and publish your thoughts easily with our intuitive editor
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Secure</h3>
            <p className="text-gray-600">
              Your data is protected with industry-standard security measures
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Fast</h3>
            <p className="text-gray-600">
              Experience lightning-fast performance with modern technology
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Crowd App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
