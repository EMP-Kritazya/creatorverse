import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";

const AddCreator = () => {
  const navigate = useNavigate();

  const [creator, setCreator] = useState({
    name: "",
    description: "",
    imageURL: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const supabaseUrl = supabase.supabaseUrl;
    const supabaseKey = supabase.supabaseKey;

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/creators`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify([
          {
            name: creator.name,
            description: creator.description,
            imageURL: creator.imageURL,
            youtube: creator.youtube,
            twitter: creator.twitter,
            instagram: creator.instagram,
          },
        ]),
      });

      if (response.ok) {
        alert("Creator added successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Supabase API Error:", errorData);
        alert("Failed to add creator.");
      }
    } catch (error) {
      console.error("Network Error running native fetch:", error);
    }
  };
  return (
    <main
      className="container"
      style={{ maxWidth: "750px", padding: "1rem 0" }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <Link to="/" style={{ fontSize: "0.9rem", textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>
        <h2 style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          Create Profile
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
          Add a new content creator to the universe
        </p>
      </header>

      <article
        style={{
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <form onSubmit={handleSubmit} style={{ margin: 0 }}>
          <div className="grid">
            <label htmlFor="name">
              Profile Name
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Marques Brownlee"
                value={creator.name}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor="imageURL">
              Image URL{" "}
              <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                (Optional)
              </span>
              <input
                type="url"
                id="imageURL"
                name="imageURL"
                placeholder="https://example.com/avatar.jpg"
                value={creator.imageURL}
                onChange={handleChange}
              />
            </label>
          </div>

          <label htmlFor="description" style={{ marginTop: "0.5rem" }}>
            Biography & Description
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Tell us about what kind of content they make..."
              value={creator.description}
              onChange={handleChange}
              required
            />
          </label>

          <hr style={{ margin: "2rem 0", opacity: 0.1 }} />

          <h5
            style={{
              color: "#38bdf8",
              letterSpacing: "0.5px",
              marginBottom: "0.25rem",
            }}
          >
            SOCIAL MEDIA HANDLES
          </h5>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#94a3b8",
              marginBottom: "1.5rem",
            }}
          >
            Provide handles without the leading "@" symbol.
          </p>

          <div className="grid" style={{ gap: "1rem" }}>
            <label htmlFor="youtube">
              YouTube
              <input
                type="text"
                id="youtube"
                name="youtube"
                placeholder="handle"
                value={creator.youtube}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="twitter">
              Twitter
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="handle"
                value={creator.twitter}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="instagram">
              Instagram
              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="handle"
                value={creator.instagram}
                onChange={handleChange}
              />
            </label>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "2rem",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              className="secondary outline"
              style={{ width: "auto", margin: 0 }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ width: "auto", margin: 0, padding: "0 2rem" }}
            >
              + Add Creator
            </button>
          </div>
        </form>
      </article>
    </main>
  );
};

export default AddCreator;
