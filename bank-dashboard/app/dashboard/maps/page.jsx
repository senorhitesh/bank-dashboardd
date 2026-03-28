"use client";

import { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Phone,
  Clock,
  Copy,
  CheckCheck,
  Pencil,
  X,
  Navigation,
  Building2,
} from "lucide-react";

const INITIAL = {
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.1536219709715!2d79.295706!3d19.9600407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd2d5d49e4d4017%3A0xb9ea7964db8706b4!2sChandrapur%20District%20Central%20Co-operative%20Bank!5e0!3m2!1sen!2sin!4v1774679813677!5m2!1sen!2sin",
  branchName: "Chandrapur District Central Co-operative Bank",
  address: "X76W+278, Bazar Ward, Chandrapur, Maharashtra 442401",
  phone: "07172-252180",
  hours: "Mon – Fri: 10:00 AM – 4:00 PM",
};

const FIELDS = [
  { key: "branchName", label: "Branch name", placeholder: "Full bank name" },
  { key: "address", label: "Address", placeholder: "Full address" },
  { key: "phone", label: "Phone", placeholder: "07172-252180" },
  {
    key: "hours",
    label: "Working hours",
    placeholder: "Mon – Fri: 10:00 AM – 4:00 PM",
  },
];

function parseEmbed(raw) {
  const match = raw.match(/src="([^"]+)"/);
  return match ? match[1] : raw;
}

function EditModal({ config, onSave, onClose }) {
  const [form, setForm] = useState({ ...config });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.branchName.trim()) e.branchName = "Required";
    if (!form.embedUrl.trim()) e.embedUrl = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave({ ...form, embedUrl: parseEmbed(form.embedUrl) });
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div
        className="bg-white rounded-4 shadow-lg w-100 overflow-auto"
        style={{ maxWidth: "500px", maxHeight: "90vh" }}
      >
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom sticky-top bg-white">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
              style={{ width: "32px", height: "32px" }}
            >
              <MapPin className="text-primary" size={16} />
            </div>
            <h5 className="mb-0 fs-6 fw-semibold text-dark">
              Edit map details
            </h5>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-light border-0 p-1 d-flex align-items-center justify-content-center"
          >
            <X size={20} className="text-secondary" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 d-flex flex-column gap-3"
        >
          {FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className="d-flex flex-column gap-1">
              <label className="small fw-medium text-secondary">{label}</label>
              <input
                type="text"
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className={`form-control form-control-sm ${errors[key] ? "is-invalid" : ""}`}
              />
              {errors[key] && (
                <div className="invalid-feedback d-block mt-0">
                  {errors[key]}
                </div>
              )}
            </div>
          ))}

          <div className="d-flex flex-column gap-1">
            <label className="small fw-medium text-secondary">
              Google Maps embed code or URL
            </label>
            <textarea
              rows={3}
              value={form.embedUrl}
              onChange={(e) => set("embedUrl", e.target.value)}
              placeholder="Paste full <iframe> tag or just the src URL"
              className={`form-control form-control-sm font-monospace ${errors.embedUrl ? "is-invalid" : ""}`}
              style={{ resize: "none" }}
            />
            {errors.embedUrl && (
              <div className="invalid-feedback d-block mt-0">
                {errors.embedUrl}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-outline-secondary px-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-primary px-3 text-white"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, value }) {
  return (
    <div className="d-flex align-items-start gap-3">
      <div
        className="bg-light border rounded d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
        style={{ width: "32px", height: "32px" }}
      >
        <Icon size={16} className="text-secondary" />
      </div>
      <p className="mb-0 small text-dark lh-base pt-1">{value}</p>
    </div>
  );
}

export default function MapsPage() {
  const [config, setConfig] = useState(INITIAL);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(config.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {editing && (
        <EditModal
          config={config}
          onSave={(data) => {
            setConfig(data);
            setEditing(false);
          }}
          onClose={() => setEditing(false)}
        />
      )}

      <div className="d-flex flex-column gap-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="fs-5 fw-semibold text-dark mb-0">Bank Map</h2>
            <p className="small text-secondary mb-0 mt-1">
              Main branch location
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 shadow-sm bg-white text-dark"
          >
            <Pencil size={14} />
            Edit details
          </button>
        </div>

        <div className="bg-white rounded-4 border shadow-sm overflow-hidden">
          <div className="d-flex flex-column flex-lg-row">
            {/* Map embed */}
            <div
              className="position-relative flex-grow-1"
              style={{ minHeight: 480 }}
            >
              <iframe
                src={config.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 480 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info panel */}
            <div
              className="d-flex flex-column border-top border-lg-top-0 border-start-lg"
              style={{ width: "100%", flex: "0 0 360px" }}
            >
              <div className="px-4 py-3 border-bottom">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="bg-primary rounded d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "36px", height: "36px" }}
                  >
                    <Building2 size={18} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="mb-0 text-secondary fw-semibold text-uppercase"
                      style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                    >
                      Main Branch
                    </p>
                    <h3 className="mb-0 fs-6 fw-semibold text-dark lh-sm mt-1">
                      {config.branchName}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 d-flex flex-column gap-3 flex-grow-1">
                <InfoRow icon={MapPin} value={config.address} />
                <InfoRow icon={Phone} value={config.phone} />
                <InfoRow icon={Clock} value={config.hours} />
              </div>

              <div className="px-4 py-3 border-top d-flex flex-column gap-2">
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      onClick={copyAddress}
                      className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2 small py-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {copied ? (
                        <>
                          <CheckCheck size={16} className="text-success" />{" "}
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy address
                        </>
                      )}
                    </button>
                  </div>
                  <div className="col-6">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(config.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2 small py-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <ExternalLink size={16} />
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="px-4 py-2 bg-light border-top">
                <p
                  className="mb-0 text-secondary d-flex align-items-center gap-1"
                  style={{ fontSize: "12px" }}
                >
                  <MapPin size={12} className="flex-shrink-0" />
                  Powered by Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
