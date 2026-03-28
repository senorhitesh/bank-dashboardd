"use client";

import { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Save, RotateCcw, Globe, Link as LinkIcon, Share2 } from "lucide-react";
import CustomInput from "@/app/Components/CustomInput";

// Assuming you've created this based on previous steps

const initialBankData = {
  WebsiteTitle: "The Chandrapur District Central Co-operative Bank",
  OpenCloseTime: "10:00 AM to 04:00 PM 2nd & 4th Saturday Closed",
  LocationCity: "Chandrapur",
  RegistrationNo: "RPCD.NAG.DCCB/L/09",
  RBILicenseNo: "CDCC/test01",
  BankIFSC: "CDCC/test01",
  PAN: "CDCC/test01",
  TAN: "CDCC/test01",
  NetBankingLink: "",
  AndroidApplicationLink:
    "https://play.google.com/store/apps/details?id=com.trustbank.cdccbank",
  IOSApplicationLink: "",
  GST: "",
  FacebookLink: "",
  InstagramLink: "",
  Twitter: "",
  Youtube: "",
  WhatsAppBanking: "",
};

export default function WebInfoSettings() {
  const [formData, setFormData] = useState(initialBankData);
  const [savedData, setSavedData] = useState(initialBankData);

  const isChanged = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(savedData);
  }, [formData, savedData]);

  const handleUpdate = (key: keyof typeof initialBankData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const saveChanges = () => {
    setSavedData(formData);
    toast.success("All changes saved to server!");
  };

  return (
    <div className="container-fluid p-0">
      <Toaster />
      <div className="bg-white border-bottom rounded px-4 py-3 mb-4 z-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h1 className="h4 fw-bold text-dark mb-1">Web Info Settings</h1>
          </div>

          <div className="d-flex gap-2">
            {isChanged && (
              <button
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                onClick={() => setFormData(savedData)}
              >
                <RotateCcw size={16} /> Revert
              </button>
            )}
            <button
              className={`btn d-flex align-items-center gap-2 px-4 ${isChanged ? "btn-primary shadow" : "btn-light border disabled"}`}
              onClick={saveChanges}
              disabled={!isChanged}
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* 2. FORM CONTENT AREA */}
      <div>
        <div className="row g-4">
          {/* CARD 1: BANK CORE DETAILS */}
          <div className="col-12">
            <div className="card border-0 shadow-sm overflow-hidden rounded-4">
              <div className="card-header bg-white py-3 border-bottom d-flex align-items-center gap-2">
                <Globe size={20} className="text-primary" />
                <h5 className="mb-0 fw-bold">Bank Basic Details</h5>
              </div>
              <div className="card-body p-4">
                {/* 3-column grid for full page feel */}
                <div className="row g-4">
                  <div className="col-lg-4 col-md-6">
                    <CustomInput
                      label="Website Title"
                      value={formData.WebsiteTitle}
                      onChange={(v) => handleUpdate("WebsiteTitle", v)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <CustomInput
                      label="Operation Hours"
                      value={formData.OpenCloseTime}
                      onChange={(v) => handleUpdate("OpenCloseTime", v)}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <CustomInput
                      label="Location City"
                      value={formData.LocationCity}
                      onChange={(v) => handleUpdate("LocationCity", v)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <CustomInput
                      label="IFSC Code"
                      value={formData.BankIFSC}
                      onChange={(v) => handleUpdate("BankIFSC", v)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <CustomInput
                      label="RBI License No."
                      value={formData.RBILicenseNo}
                      onChange={(v) => handleUpdate("RBILicenseNo", v)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <CustomInput
                      label="PAN No."
                      value={formData.PAN}
                      onChange={(v) => handleUpdate("PAN", v)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <CustomInput
                      label="Registration No."
                      value={formData.RegistrationNo}
                      onChange={(v) => handleUpdate("RegistrationNo", v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: BANKING & APP LINKS */}
          <div className="col-xl-6 col-12">
            <div className="card border-0 shadow-sm h-100 rounded-4">
              <div className="card-header bg-white py-3 border-bottom d-flex align-items-center gap-2">
                <LinkIcon size={20} className="text-primary" />
                <h5 className="mb-0 fw-bold">Banking Links</h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <CustomInput
                      label="Net Banking Login URL"
                      value={formData.NetBankingLink}
                      onChange={(v) => handleUpdate("NetBankingLink", v)}
                      placeholder="https://"
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Android App Store"
                      value={formData.AndroidApplicationLink}
                      onChange={(v) =>
                        handleUpdate("AndroidApplicationLink", v)
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="iOS App Store"
                      value={formData.IOSApplicationLink}
                      onChange={(v) => handleUpdate("IOSApplicationLink", v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: SOCIAL MEDIA CHANNELS */}
          <div className="col-xl-6 col-12">
            <div className="card border-0 shadow-sm h-100 rounded-4">
              <div className="card-header bg-white py-3 border-bottom d-flex align-items-center gap-2">
                <Share2 size={20} className="text-primary" />
                <h5 className="mb-0 fw-bold">Social Media Presence</h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <CustomInput
                      label="Facebook"
                      value={formData.FacebookLink}
                      onChange={(v) => handleUpdate("FacebookLink", v)}
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Instagram"
                      value={formData.InstagramLink}
                      onChange={(v) => handleUpdate("InstagramLink", v)}
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Twitter (X)"
                      value={formData.Twitter}
                      onChange={(v) => handleUpdate("Twitter", v)}
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="WhatsApp Support"
                      value={formData.WhatsAppBanking}
                      onChange={(v) => handleUpdate("WhatsAppBanking", v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
