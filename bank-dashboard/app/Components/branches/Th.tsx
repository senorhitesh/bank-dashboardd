export default function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-2.5 text-xs font-semibold text-neutral-500 tracking-wide whitespace-nowrap
        ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}
