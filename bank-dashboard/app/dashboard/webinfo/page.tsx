"use client";

import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Save } from "lucide-react";
import { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";

const initialBankData = {
  WebsiteTitle: "The Chandrapur District Central Co-operative Bank",
  OpenCloseTime: "10:00 AM to 04:00 PM 2nd & 4th Saturday Closed",
  LocationCity: "",
  RegistrationNo: "RPCD.NAG.DCCB/L/09",
  RBILicenseNo: "CDCC/test01",
  BankIFSC: "CDCC/test01",
  PAN: "CDCC/test01",
  TAN: "CDCC/test01",
  NetBankingLink: "",
  AndroidApplicationLink:
    "https://play.google.com/store/apps/details?id=com.trustbank.cdccbank&hl=en_IN",
  IOSApplicationLink: "",
  GST: "",
  FacebookLink: "",
  InstagramLink: "",
  Twitter: "",
  Youtube: "",
  WhatsAppBanking: "",
};

export default function WebInfoSettings() {
  const [infoChanged, setinfoChanged] = useState(false);
  const [formData, setformData] = useState(initialBankData);
  const [savedData, setSavedData] = useState(initialBankData);

  function undoChanges() {
    setformData(savedData);
    setinfoChanged(false);
  }

  const isChanged = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(savedData);
  }, [formData, savedData]);

  const updateField = (key: keyof typeof initialBankData, value: string) => {
    setformData((prev) => ({ ...prev, [key]: value }));
    setinfoChanged(true);
  };

  return (
    // container handles centering; py-4 provides vertical breathing room
    <div className="container py-4 min-vh-100">
      <Toaster />

      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h4 fw-bold text-dark mb-1">Web Info Settings</h1>
          <p className="small text-muted mb-0">
            Manage your bank's public details, application links, and social
            media presence.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {infoChanged && (
            <Button
              onClick={undoChanges}
              // We established btn-danger in previous steps
              className="btn btn-danger px-4 shadow-sm"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              if (!isChanged) return;
              setSavedData(formData);
              setinfoChanged(false);
              toast.success("Information updated successfully!");
            }}
            disabled={!isChanged}
            className={`btn px-4 shadow-sm ${
              isChanged ? "btn-primary" : "btn-secondary disabled opacity-50"
            }`}
          >
            <Save size={18} className="me-2" /> Save Changes
          </Button>
        </div>
      </div>

      <form className="d-flex flex-column gap-4">
        {/* SECTION 1: Bank Basic Details */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white py-3 px-4 border-bottom">
            <h2 className="h6 fw-bold text-dark mb-1">Bank Basic Details</h2>
            <p className="small text-muted mb-0">
              Essential public information.
            </p>
          </div>
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <Input
                  label="Website Title"
                  value={formData.WebsiteTitle}
                  onChange={(v: string) => updateField("WebsiteTitle", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Open/Close Time"
                  value={formData.OpenCloseTime}
                  onChange={(v: string) => updateField("OpenCloseTime", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Location City"
                  value={formData.LocationCity}
                  onChange={(v: string) => updateField("LocationCity", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Registration No."
                  value={formData.RegistrationNo}
                  onChange={(v: string) => updateField("RegistrationNo", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="RBI License No."
                  value={formData.RBILicenseNo}
                  onChange={(v: string) => updateField("RBILicenseNo", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Bank IFSC"
                  value={formData.BankIFSC}
                  onChange={(v: string) => updateField("BankIFSC", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="PAN No."
                  value={formData.PAN}
                  onChange={(v: string) => updateField("PAN", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="TAN No."
                  value={formData.TAN}
                  onChange={(v: string) => updateField("TAN", v)}
                />
              </div>
              <div className="col-12">
                <Input
                  label="GST No."
                  value={formData.GST}
                  onChange={(v: string) => updateField("GST", v)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Banking Links */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white py-3 px-4 border-bottom">
            <h2 className="h6 fw-bold text-dark mb-1">Banking Links</h2>
            <p className="small text-muted mb-0">App Store and Mobile URLs.</p>
          </div>
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-4">
                <Input
                  label="Net Banking Link"
                  value={formData.NetBankingLink}
                  onChange={(v: string) => updateField("NetBankingLink", v)}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Android App Link"
                  value={formData.AndroidApplicationLink}
                  onChange={(v: string) =>
                    updateField("AndroidApplicationLink", v)
                  }
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="iOS App Link"
                  value={formData.IOSApplicationLink}
                  onChange={(v: string) => updateField("IOSApplicationLink", v)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Social Media */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white py-3 px-4 border-bottom">
            <h2 className="h6 fw-bold text-dark mb-1">Social Media</h2>
            <p className="small text-muted mb-0">Official social profiles.</p>
          </div>
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <Input
                  label="Facebook Link"
                  value={formData.FacebookLink}
                  onChange={(v: string) => updateField("FacebookLink", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Instagram Link"
                  value={formData.InstagramLink}
                  onChange={(v: string) => updateField("InstagramLink", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Twitter Link"
                  value={formData.Twitter}
                  onChange={(v: string) => updateField("Twitter", v)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="WhatsApp Banking"
                  value={formData.WhatsAppBanking}
                  onChange={(v: string) => updateField("WhatsAppBanking", v)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
