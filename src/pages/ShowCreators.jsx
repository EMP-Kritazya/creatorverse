import { useState, useEffect } from "react";
import { supabase } from "../client";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const supabaseUrl = supabase.supabaseUrl;
      const supabaseKey = supabase.supabaseKey;

      try {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/creators?select=*`,
          {
            method: "GET",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();

        if (response.ok) {
          setCreators(data);
        } else {
          console.error("API Error:", data);
        }
      } catch (error) {
        console.error("Network Error fetching creators: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);
  return (
    <main className="container">
      {/* using picocss styling */}
      <header
        style={{
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <hgroup style={{ flexGrow: 1 }}>
          <h1>💫 Creatorverse</h1>
          <p>Explore your favorite content creators all in one place</p>
        </hgroup>
        <div>
          <Link to="/new" role="button" className="contrast">
            + Add New Creator
          </Link>
        </div>
      </header>

      {loading ? (
        <p aria-busy="true">Loading creators from the universe...</p>
      ) : creators && creators.length > 0 ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {creators.map((creator) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              description={creator.description}
              imageURL={creator.imageURL}
              youtube={creator.youtube}
              twitter={creator.twitter}
              instagram={creator.instagram}
            />
          ))}
        </div>
      ) : (
        <article style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <h3>No content creators found :( </h3>
          <p>
            The space is looking a bit empty. Click the button above to add
            someone spectacular!
          </p>
        </article>
      )}
    </main>
  );
};

export default ShowCreators;
