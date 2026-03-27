import React from "react";

export default function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`
        px-4 py-3 
        small fw-bold text-secondary text-uppercase 
        text-nowrap border-bottom-0
        ${align === "right" ? "text-end" : "text-start"}
      `}
      style={{ fontSize: "0.75rem", letterSpacing: "0.025em" }}
    >
      {children}
    </th>
  );
}
