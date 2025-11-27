import { useState } from "react";

// Normalize Arabic text for search
function normalizeArabicText(text) {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F]/g, '') // Remove diacritics
    .replace(/[\u0670]/g, '') // Remove superscript alef
    .toLowerCase()
    .trim();
}

// Search in text with Arabic support
function searchInText(text, query) {
  if (!query || !text) return true;
  const normalizedText = normalizeArabicText(text);
  const normalizedQuery = normalizeArabicText(query);
  return normalizedText.includes(normalizedQuery);
}

export default function SearchIsland({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const allTags = [
    ...new Set(posts.flatMap(p => p.data.tags || []))
  ];

  const allCategories = [
    ...new Set(posts.map(p => p.data.category).filter(Boolean))
  ];

  const filtered = posts.filter(post => {
    // Search in title, description, and content (body) with Arabic support
    const matchQuery = query.trim() === "" || 
      searchInText(post.data.title, query) ||
      searchInText(post.data.description, query) ||
      searchInText(post.body || '', query);

    const matchTag = activeTag ? (post.data.tags || []).includes(activeTag) : true;
    const matchCategory = activeCategory ? post.data.category === activeCategory : true;

    return matchQuery && matchTag && matchCategory;
  });

  const suggestedPosts = posts.slice(0, 3);

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
          fontSize: "16px",
          direction: "rtl"
        }}
      />

      {/* فلاتر التصنيفات */}
      {allCategories.length > 0 && (
        <div style={{ marginBottom: "15px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>التصنيفات:</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category === activeCategory ? null : category)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1px solid #555",
                  cursor: "pointer",
                  background: category === activeCategory ? "#2563eb" : "transparent",
                  color: category === activeCategory ? "#fff" : "#333"
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* فلاتر الوسوم */}
      {allTags.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>الوسوم:</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
        </div>
      )}

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
            <p style={{ color: "#666", marginTop: "8px" }}>{post.data.description}</p>
            <p style={{ color: "#999", fontSize: "14px" }}>{new Date(post.data.date).toLocaleDateString('ar-EG')}</p>

            <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {post.data.category && (
                <span
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "14px"
                  }}
                >
                  {post.data.category}
                </span>
              )}
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
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#888", fontSize: "18px", marginBottom: "20px" }}>
            لا توجد نتائج مطابقة لبحثك.
          </p>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            جرب البحث بكلمات مختلفة أو تصفح المقالات المقترحة:
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {suggestedPosts.map(post => (
              <li key={post.slug} style={{ marginBottom: "10px" }}>
                <a
                  href={`/blog/${post.slug}`}
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  {post.data.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
