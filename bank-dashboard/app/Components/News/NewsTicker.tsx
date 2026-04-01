"use client";
import { TvMinimal } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  link: string;
  sequence: number;
  expireDate: string;
  active: boolean;
}

function isExpired(date: string) {
  return date ? new Date(date) < new Date() : false;
}

export default function NewsTicker({ items }: { items: NewsItem[] }) {
  const active = [...items]
    .filter((i) => i.active && !isExpired(i.expireDate))
    .sort((a, b) => a.sequence - b.sequence);

  const tickerText = active.map((i) => `◆  ${i.title}`).join("          ");

  if (active.length === 0) return null;

  return (
    <div
      className="rounded-3 overflow-hidden"
      style={{
        background: "#0B1F3A",
        boxShadow: "0 4px 12px rgba(220, 220, 220, 0.15)",
      }}
    >
      {/* Channel header bar */}
      <div
        className="d-flex align-items-center justify-content-between px-3 py-1"
        style={{ background: "#F1F5F9", minHeight: 32 }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-1 px-2 py-0 fw-bold"
            style={{
              background: "#22C55E",
              color: "#ffffff",
              fontSize: 11,
              letterSpacing: "0.08em",
              boxShadow: "0 0 6px rgba(34,197,94,0.6)",
            }}
          >
            LIVE
          </div>

          {/* fixed typo */}
          <TvMinimal size={13} className="text-black opacity-75" />

          <span
            className="text-black fw-semibold"
            style={{ fontSize: 12, letterSpacing: "0.05em" }}
          >
            BANK NEWS
          </span>
        </div>

        <span className="text-black opacity-50" style={{ fontSize: 10 }}>
          {active.length} active {active.length === 1 ? "update" : "updates"}
        </span>
      </div>

      {/* Scrolling ticker */}
      <div
        className="d-flex align-items-center"
        style={{ height: 44, overflow: "hidden", position: "relative" }}
      >
        {/* Breaking news label */}
        <div
          className="d-flex align-items-center justify-content-center flex-shrink-0 px-3 h-100 fw-bold"
          style={{
            fontSize: 11,
            letterSpacing: "0.06em",
            minWidth: 110,
            zIndex: 2,
            background: "#E2E8F0",
            color: "#0F172A",
          }}
        >
          Current
          <br />
          NEWS
        </div>

        {/* Scrolling text */}
        <div style={{ overflow: "hidden", flex: 1, position: "relative" }}>
          <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .ticker-track {
          display: inline-block;
          white-space: nowrap;
          animation: ticker-scroll 25s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

          <div className="ticker-track">
            {active.map((item, i) => (
              <span key={item.id} style={{ marginRight: 60 }}>
                <span
                  style={{
                    color: "#FFC857",
                    fontWeight: 700,
                    fontSize: 13,
                    marginRight: 6,
                  }}
                >
                  ◆
                </span>

                {item.link && item.link !== "#" ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#F8FAFC",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {item.title}
                  </a>
                ) : (
                  <span
                    style={{
                      color: "#F8FAFC",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </span>
                )}

                {i < active.length - 1 && (
                  <span
                    style={{
                      color: "#FF6B6B",
                      marginLeft: 60,
                      fontSize: 16,
                    }}
                  >
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right fade mask */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 60,
            background: "linear-gradient(to right, transparent, #0B1F3A)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
