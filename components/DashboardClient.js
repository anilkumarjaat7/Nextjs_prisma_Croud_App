"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardClient({ user }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.posts || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load posts");
      setLoading(false);
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        fetchPosts();
      } else {
        setError("Failed to create post");
      }
    } catch (err) {
      setError("An error occurred");
    }
  }

  async function handleDeletePost(postId) {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (err) {
      setError("Failed to delete post");
    }
  }

  async function handleSignOut() {
    await signOut({ redirect: true, callbackUrl: "/" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, {user.name || user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Create Post Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Create New Post
          </h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                placeholder="Write your post content here..."
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Create Post
            </button>
          </form>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Your Posts</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No posts yet. Create one above!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.title}
                    </h3>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600 mb-2">{post.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
