import { Link } from "react-router-dom";

const Card = ({
  id,
  name,
  description,
  imageURL,
  youtube,
  twitter,
  instagram,
}) => {
  const displayImage =
    // fallback image, for just in case type of cases (HAHA EMOJI)
    imageURL ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop";

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ height: "350px", width: "100%", overflow: "hidden" }}>
        <img
          src={displayImage}
          alt={`${name}'s banner`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </div>

      <div
        style={{
          padding: "1.5rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ marginBottom: "0.5rem" }}>{name}</h3>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "1rem",
            fontSize: "1.2rem",
          }}
        >
          {youtube && (
            <a
              href={`https://youtube.com/@${youtube}`}
              target="_blank"
              rel="noreferrer"
              title="YouTube"
            >
              Youtube
            </a>
          )}
          {twitter && (
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noreferrer"
              title="Twitter"
            >
              Twitter
            </a>
          )}
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              Instagram
            </a>
          )}
        </div>

        <p style={{ color: "#a0aec0", fontSize: "0.95rem", flexGrow: 1 }}>
          {description.length > 120
            ? `${description.substring(0, 120)}...`
            : description}
        </p>

        <footer
          style={{
            background: "transparent",
            padding: "1rem 0 0 0",
            display: "flex",
            gap: "10px",
          }}
        >
          <Link
            to={`/view/${id}`}
            role="button"
            className="outline"
            style={{ flexGrow: 1, padding: "0.5rem" }}
          >
            View Profile
          </Link>
          <Link
            to={`/edit/${id}`}
            role="button"
            className="secondary outline"
            style={{ padding: "0.5rem 1rem" }}
            title="Edit Creator"
          >
            Edit Creator's Profile
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default Card;
