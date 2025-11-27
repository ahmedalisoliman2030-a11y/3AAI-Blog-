import { useState } from "react";

export default function SearchIsland({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const allTags = [
    ...new Set(posts.flatMap(p => p.data.tags || []))
  ];

  const filtered = posts.filter(post => {
    const matchQuery =
      post.data.title.toLowerCase().includes(query.toLowerCase());

    const matchTag = activeTag ? (post.data.tags || []).includes(activeTag) : true;

    return matchQuery && matchTag;
  });

  return (
    <div style={{ marginTop: "20px" }}>

      {/* صندوق البحث */}
      <input
        type="text"
        placeholder="ابحث عن مقال..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px"
        }}
      />

      {/* الفلاتر */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            style={{
              padding: "5px 15px",
              borderRadius: "20px",
              border: "1px solid #555",
              cursor: "pointer",
              background: tag === activeTag ? "#333" : "transparent",
              color: tag === activeTag ? "#fff" : "#333"
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* عرض النتائج */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.map(post => (
          <li key={post.slug}
            style={{
              marginBottom: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }}
          >
            <a
              href={`/blog/${post.slug}`}
              style={{ fontSize: "20px", textDecoration: "none", color: "#000" }}
            >
              {post.data.title}
            </a>
            <p style={{ color: "#666" }}>{post.data.date}</p>

            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              {(post.data.tags || []).map(tag => (
                <span
                  key={tag}
                  style={{
                    background: "#eee",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "14px"
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p style={{ color: "#888" }}>لا توجد نتائج مطابقة.</p>
      )}

    </div>
  );
}
