interface ChangeProp {
  [key: string]: string;
}

export default function DiffBlock({
  label,
  data,
  color,
  bg,
}: {
  label: string;
  data: ChangeProp;
  color: string;
  bg: string;
}) {
  const keys = Object.keys(data);
  return (
    <div className="flex-fill" style={{ minWidth: 0 }}>
      <div
        className="fw-semibold mb-2 d-flex align-items-center gap-1"
        style={{ fontSize: 12, color }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
          }}
        />
        {label}
      </div>
      <div
        className="rounded-3 border p-3"
        style={{
          background: bg,
          minHeight: 80,
          fontSize: 12,
          fontFamily: "monospace",
        }}
      >
        {keys.length === 0 ? (
          <span className="text-muted fst-italic">— empty —</span>
        ) : (
          keys.map((k) => (
            <div key={k} className="mb-1">
              <span style={{ color: "#64748b", marginRight: 4 }}>{k}:</span>
              <span className="text-dark" style={{ wordBreak: "break-all" }}>
                {data[k] || (
                  <span className="text-muted fst-italic">empty</span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
