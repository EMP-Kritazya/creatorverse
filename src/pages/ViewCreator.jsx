import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  // To add an extra loading feature -- beautifying :)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
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
          setCreator(data);
        } else {
          console.error("Supabase API Error:", data);
        }
      } catch (error) {
        console.error("Network Error running native fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreatorDetails();
  }, [id]);

  if (loading) {
    return <h2>Loading creator details...</h2>;
  }

  // handle edge cases
  if (!creator) {
    return <h2>Creator not found!</h2>;
  }
  const displayImage =
    creator.imageURL ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop";

  return (
    <main
      className="container"
      style={{ maxWidth: "900px", padding: "1rem 0" }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <Link to="/" style={{ fontSize: "0.9rem", textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>
      </header>

      <article
        style={{
          padding: 0,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 0,
          }}
        >
          <div style={{ height: "450px", width: "100%" }}>
            <img
              src={displayImage}
              alt={creator.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ marginBottom: "0.5rem" }}>{creator.name}</h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "1.5rem",
                }}
              >
                {creator.youtube && (
                  <a
                    href={`https://youtube.com/@${creator.youtube}`}
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                    className="outline secondary"
                    style={{
                      padding: "4px 12px",
                      fontSize: "0.85rem",
                      margin: 0,
                    }}
                  >
                    <strong>Youtube</strong> @{creator.youtube}
                  </a>
                )}
                {creator.twitter && (
                  <a
                    href={`https://twitter.com/${creator.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                    className="outline secondary"
                    style={{
                      padding: "4px 12px",
                      fontSize: "0.85rem",
                      margin: 0,
                    }}
                  >
                    <strong>Twitter</strong> @{creator.instagram}
                  </a>
                )}
                {creator.instagram && (
                  <a
                    href={`https://instagram.com/${creator.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                    className="outline secondary"
                    style={{
                      padding: "4px 12px",
                      fontSize: "0.85rem",
                      margin: 0,
                    }}
                  >
                    <strong>Instagram</strong> @{creator.instagram}
                  </a>
                )}
              </div>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.6",
                  fontSize: "1.05rem",
                }}
              >
                {creator.description}
              </p>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "2rem" }}>
              <Link
                to={`/edit/${creator.id}`}
                role="button"
                style={{ flexGrow: 1, margin: 0 }}
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default ViewCreator;
