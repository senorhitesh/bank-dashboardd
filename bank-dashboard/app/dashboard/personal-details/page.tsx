"use client";

import { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Save, RotateCcw, Globe, Link as LinkIcon, Share2 } from "lucide-react";
import CustomInput from "@/app/Components/CustomInput";
import TextEditor from "@/app/Components/TextEditor";

// Advance;
const initialBankData = {
  ContactNo: "07172-252180",
  ContactNo2: "07172-252180",
  Email: "info@cdccbank.co.in",
  Emai2: "/test01",
  FaxNo: "07172-255224",
  Address:
    "Head Office Civil Lines, Nagpur Road Chandrapur, 442401,Maharashtra , India",
  ShareCapital: "1230",
  Branches: "92",
  Deposits: "1785.51",
  Advance: "1119.71",
};
type TabType = "About" | "Mission & Vision" | "History";
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

  const [activeTab, setActiveTab] = useState<TabType>("About");
  return (
    <div className="container-fluid p-0">
      <Toaster />
      <div className="bg-white border-bottom rounded px-4 py-3 mb-4 z-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h1 className="h4 fw-bold text-dark mb-1">Bank Personal Info</h1>
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
                <h5 className="mb-0 fw-bold">Bank Contact Details</h5>
              </div>
              <div className="card-body p-4">
                {/* 3-column grid for full page feel */}
                <div className="row g-4">
                  <div className="col-lg-4 col-md-6">
                    <CustomInput
                      label="Primary Phone (1)"
                      value={formData.ContactNo}
                      onChange={(v) => handleUpdate("ContactNo", v)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <CustomInput
                      label="Secondary Phone (2)"
                      value={formData.ContactNo2}
                      onChange={(v) => handleUpdate("ContactNo2", v)}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <CustomInput
                      label="Primary Email"
                      value={formData.Email}
                      onChange={(v) => handleUpdate("Email", v)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <CustomInput
                      label="Secondary Email"
                      value={formData.FaxNo}
                      onChange={(v) => handleUpdate("FaxNo", v)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <CustomInput
                      label="Fax Number"
                      value={formData.Emai2}
                      onChange={(v) => handleUpdate("Emai2", v)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <CustomInput
                      label="Address"
                      value={formData.Address}
                      onChange={(v) => handleUpdate("Address", v)}
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
                <h5 className="mb-0 fw-bold">
                  Financial & Operational Information
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <CustomInput
                      label="Share Capital"
                      value={formData.ShareCapital}
                      onChange={(v) => handleUpdate("ShareCapital", v)}
                      placeholder="https://"
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Number of Branches"
                      value={formData.Branches}
                      onChange={(v) => handleUpdate("Branches", v)}
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Deposits"
                      value={formData.Deposits}
                      onChange={(v) => handleUpdate("Deposits", v)}
                    />
                  </div>
                  <div className="col-md-12">
                    <CustomInput
                      label="Advances"
                      value={formData.Advance}
                      onChange={(v) => handleUpdate("Advance", v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-12">
            <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
              {/* Header */}
              <div className="card-header bg-white py-3 border-bottom d-flex align-items-center gap-2">
                <LinkIcon size={20} className="text-primary" />
                <h5 className="mb-0 fw-bold">Bank Overview</h5>
              </div>

              {/* Tabs - Full Width */}
              <div className="w-100 border-bottom">
                {/* Removed gap-4, keeping d-flex to allow flex-fill to work */}
                <div className="d-flex align-items-center w-100">
                  {["About", "Mission & Vision", "History"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`btn py-2 btn-sm px-3 pb-2 flex-fill rounded-0 border-0 border-bottom fw-medium ${
                        activeTab === t
                          ? "border-primary text-primary"
                          : "border-transparent text-secondary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="card-body p-4">
                {activeTab === "About" && (
                  <div
                    style={{
                      height: "250px", // or whatever fits your layout
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <TextEditor />
                  </div>
                )}
                {activeTab === "Mission & Vision" && <TextEditor />}
                {activeTab === "History" && <TextEditor />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
