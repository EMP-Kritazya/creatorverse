import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState({
    name: "",
    description: "",
    imageURL: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCreatorToEdit = async () => {
      setLoading(true);
      const supabaseUrl = supabase.supabaseUrl;
      const supabaseKey = supabase.supabaseKey;

      try {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/creators?select=*&id=eq.${id}`,
          {
            method: "GET",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Accept: "application/vnd.pgrst.object+json",
            },
          },
        );

        const data = await response.json();
        if (response.ok) {
          setCreator({
            name: data.name,
            description: data.description,
            imageURL: data.imageURL || "",
            youtube: data.youtube || "",
            twitter: data.twitter || "",
            instagram: data.instagram || "",
          });
        }
      } catch (error) {
        console.error("Error fetching creator:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreatorToEdit();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const supabaseUrl = supabase.supabaseUrl;
    const supabaseKey = supabase.supabaseKey;

    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/creators?id=eq.${id}`,
        {
          method: "PATCH",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: creator.name,
            description: creator.description,
            imageURL: creator.imageURL,
            youtube: creator.youtube,
            twitter: creator.twitter,
            instagram: creator.instagram,
          }),
        },
      );

      if (response.ok) {
        alert("Creator updated successfully!");
        navigate(`/view/${id}`);
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error running update fetch:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${creator.name}?`,
    );

    if (confirmed) {
      const supabaseUrl = supabase.supabaseUrl;
      const supabaseKey = supabase.supabaseKey;

      try {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/creators?id=eq.${id}`,
          {
            method: "DELETE", // 👈 DELETE removes rows matching the query filter
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        );

        if (response.ok) {
          alert("Creator deleted successfully!");
          navigate("/");
        } else {
          alert("Failed to delete creator.");
        }
      } catch (error) {
        console.error("Error running delete fetch:", error);
      }
    }
  };

  if (loading) {
    return (
      <main
        className="container"
        style={{ maxWidth: "750px", padding: "2rem 0" }}
      >
        <p aria-busy="true">Loading profile details...</p>
      </main>
    );
  }

  return (
    <main
      className="container"
      style={{ maxWidth: "750px", padding: "1rem 0" }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <Link
          to={`/view/${id}`}
          style={{ fontSize: "0.9rem", textDecoration: "none" }}
        >
          ← Back to Profile
        </Link>
        <h2 style={{ marginTop: "0.5rem", marginBottom: "0" }}>
          Modify Profile
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
          Update details for {creator.name}
        </p>
      </header>

      <article
        style={{
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <form onSubmit={handleUpdate} style={{ margin: 0 }}>
          <div className="grid">
            <label htmlFor="name">
              Profile Name
              <input
                type="text"
                id="name"
                name="name"
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
                value={creator.instagram}
                onChange={handleChange}
              />
            </label>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <button type="submit" style={{ margin: 0, flexGrow: 1 }}>
              Save Changes
            </button>

            <button
              type="button"
              className="outline"
              style={{
                margin: 0,
                color: "#ef4444",
                borderColor: "#ef4444",
                backgroundColor: "transparent",
                width: "auto",
              }}
              onClick={handleDelete}
            >
              Delete Profile
            </button>

            <button
              type="button"
              className="secondary outline"
              style={{ width: "auto", margin: 0 }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </article>
    </main>
  );
};

export default EditCreator;
