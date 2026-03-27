import React from "react";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface AnalayticProp {
  icon: LucideIcon;
  percentage?: string;
  Title: string;
  data: string;
  className?: string; // e.g., "bg-primary-subtle text-primary"
}

const AnalayticCard = ({
  icon: Icon,
  data,
  percentage,
  Title,
  className = "bg-light text-dark",
}: AnalayticProp) => {
  return (
    // 'card' provides the border, background, and shadow-sm is a native BS utility
    <div className="card border-light shadow-sm rounded-4 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          {/* Icon Container */}
          <div
            className={`d-flex align-items-center justify-content-center rounded-3 border transition-all ${className}`}
            style={{
              width: "44px",
              height: "44px",
              transition: "0.2s ease",
            }}
          >
            <Icon size={20} />
          </div>

          {/* Text Content */}
          <div className="d-flex flex-column">
            <p className="small fw-medium text-secondary mb-1 leading-tight">
              {Title}
            </p>
            <h3 className="h4 fw-bold text-dark mb-0 tracking-tight">{data}</h3>
          </div>
        </div>

        {/* Percentage Badge */}
        {percentage && (
          <div className="align-self-end">
            <span
              className="badge rounded-pill bg-success-subtle text-success border border-success-subtle d-flex align-items-center px-2 py-1"
              style={{ fontSize: "0.75rem" }}
            >
              <ArrowUpRight size={12} className="me-1" strokeWidth={3} />
              {percentage}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalayticCard;
