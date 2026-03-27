"use client";

import {
  ArrowUpRight,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  EllipsisVertical,
  Megaphone,
  Plus,
} from "lucide-react";
import AnalayticCard from "../Components/AnalayticCard";
import { Edit02 } from "@untitledui/icons";

// --- InfoRow Sub-component ---
const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => {
  return (
    // d-flex replaces flex; border-bottom handles the separators
    <div className="d-flex align-items-start gap-3 py-3 border-bottom border-light last-child-border-0">
      {/* Icon Container */}
      <div
        className="d-flex align-items-center justify-content-center rounded-3 bg-light text-secondary"
        style={{ width: "40px", height: "40px", flexShrink: 0 }}
      >
        <Icon size={20} />
      </div>

      {/* Text Content */}
      <div className="d-flex flex-column">
        <p className="small text-muted fw-medium mb-0">{label}</p>
        <p className="text-dark fw-medium mb-0">{value}</p>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="d-flex flex-column gap-4">
      {/* 1. Header & Analytics Title */}
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="h5 fw-bold text-dark mb-0">Analytics</h2>
        <div
          className="btn btn-white border shadow-sm d-flex align-items-center gap-2 py-1 px-3 rounded-2 transition-all"
          style={{ cursor: "pointer" }}
        >
          <span className="small fw-bold text-dark">Visit Site</span>
          <ArrowUpRight size={14} className="text-muted" />
        </div>
      </div>

      {/* 2. Analytics Cards Grid */}
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <AnalayticCard
            Title="Page views"
            data={"12,000"}
            icon={Eye}
            percentage={"3.3"}
            className="bg-primary-subtle text-primary border-primary-subtle"
          />
        </div>
        <div className="col-12 col-md-6">
          <AnalayticCard
            Title="Last Login Time"
            icon={User}
            data={"2026-03-20 12:21:02"}
            className="bg-light text-dark border-light"
          />
        </div>
      </div>

      {/* 3. Bank Details & Overview Row */}
      <div className="row g-3">
        {/* Left: Bank Details Card */}
        <div className="col-12 col-lg-8">
          <div className="card border-light shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="small fw-bold text-muted text-uppercase mb-0 tracking-wider">
                Details
              </p>
              <button className="btn btn-link p-0 text-muted hover-primary transition-all">
                <Edit02 size={18} />
              </button>
            </div>

            <InfoRow
              icon={User}
              label="User Name"
              value="The Chandrapur District Central Co-Operative Bank"
            />
            <InfoRow icon={Mail} label="Email" value="info@cdccbank.co.in" />
            <InfoRow icon={Phone} label="Phone" value="07172-252180" />
            <InfoRow
              icon={MapPin}
              label="Address"
              value="Head Office Civil Lines, Nagpur Road Chandrapur, 442401, Maharashtra, India"
            />
          </div>
        </div>

        {/* Right: Overview Stats Card */}
        <div className="col-12 col-lg-4">
          <div className="card border-light shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="small fw-bold text-muted text-uppercase mb-0 tracking-wider">
                Overview
              </p>
              <button className="btn btn-link p-0 text-muted">
                <EllipsisVertical size={18} />
              </button>
            </div>

            <div className="d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between py-3 border-bottom border-light">
                <p className="small fw-medium text-secondary mb-0">Users</p>
                <p className="h6 fw-bold text-dark mb-0">32</p>
              </div>
              <div className="d-flex align-items-center justify-content-between py-3 border-bottom border-light">
                <p className="small fw-medium text-secondary mb-0">Staff</p>
                <p className="h6 fw-bold text-dark mb-0">12</p>
              </div>
              <div className="d-flex align-items-center justify-content-between py-3 border-bottom border-light">
                <p className="small fw-medium text-secondary mb-0">Branch</p>
                <p className="h6 fw-bold text-dark mb-0">02</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. News and Notification Section */}
      <div className="card border-light shadow-sm rounded-4 overflow-hidden">
        {/* Header */}
        <div className="card-header bg-white py-3 px-4 d-flex align-items-center justify-content-between border-bottom border-light">
          <div className="d-flex align-items-center gap-2">
            <Megaphone size={18} className="text-secondary" />
            <h2 className="h6 fw-bold text-dark mb-0">News & Notifications</h2>
            <span className="badge rounded-pill bg-primary px-3 ms-2">New</span>
          </div>
          <button className="btn btn-light btn-sm rounded-circle p-1">
            <Plus size={18} className="text-muted" />
          </button>
        </div>

        {/* Notifications List */}
        <div
          className="list-group list-group-flush"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <div className="list-group-item list-group-item-action p-4 border-0 border-bottom border-light">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <p className="small fw-medium text-dark mb-0">
                Welcome to The Chandrapur District Central Co-operative Bank Ltd
              </p>
              <span className="small text-muted fw-medium text-nowrap">
                2025-02-22
              </span>
            </div>
          </div>
          {/* Add more items here */}
        </div>
      </div>
    </div>
  );
}
