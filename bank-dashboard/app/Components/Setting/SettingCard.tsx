"use client";

import { LucideIcon, ChevronRight } from "lucide-react";

interface SettingCardProps {
  title: string;
  description?: React.ReactNode;
  Icon: LucideIcon;
  onClick?: () => void;
}

const SettingCard = ({
  title,
  description,
  Icon,
  onClick,
}: SettingCardProps) => {
  return (
    <div
      onClick={onClick}
      className="d-flex align-items-center justify-content-between p-3 border-bottom"
      style={{
        transition: "background 0.2s ease",
        minHeight: 72,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <div className="d-flex gap-3 align-items-center">
        {/* ✅ FIX: was "align-it ems-center" — space in the middle of a class name */}
        <div
          className="d-flex align-items-center justify-content-center bg-light rounded-circle flex-shrink-0"
          style={{ width: 45, height: 45 }}
        >
          <Icon size={20} color="#4b5563" />
        </div>
        <div>
          <h6 className="m-0 fw-semibold text-dark" style={{ fontSize: 14 }}>
            {title}
          </h6>
          {description && (
            <small className="text-muted d-block" style={{ fontSize: 13 }}>
              {/* ✅ FIX: password field — mask value with bullets */}
              {description}
            </small>
          )}
        </div>
      </div>

      {/* ✅ ADD: missing chevron to indicate it's tappable */}
      <ChevronRight size={16} color="#9ca3af" className="flex-shrink-0" />
    </div>
  );
};

export default SettingCard;
