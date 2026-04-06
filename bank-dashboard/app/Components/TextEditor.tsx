"use client";

import { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Globe, Link as LinkIcon, Share2 } from "lucide-react";
import CustomInput from "@/app/Components/CustomInput";
import TextEditor from "@/app/Components/TextEditor";
import Header from "@/app/Components/WebInfo/Header";

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
  About: "",
  MissionVison: "",
  History: "",
};
type TabType = "About" | "Mission & Vision" | "History";
export default function WebInfoSettings() {
  const [formData, setFormData] = useState(initialBankData);
  const [savedData, setSavedData] = useState(initialBankData);

  const [TextEditorDataAbout, setTextEditorDataAbout] = useState(
    formData.About,
  );
  const [TextEditorDataMV, setTextEditorDataMV] = useState(
    formData.MissionVison,
  );
  const [TextEditorDataHIS, setTextEditorDataHIS] = useState(formData.History);

  const isChanged = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(savedData);
  }, [formData, savedData]);

  const handleUpdate = (key: keyof typeof initialBankData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const saveChanges = () => {
    setSavedData(formData);
    toast.success("All changes saved !");
  };
  const tabs: TabType[] = ["About", "Mission & Vision", "History"];

  const [activeTab, setActiveTab] = useState<TabType>("About");
  return (
    <>
      <div className="container-fluid p-0">
        <Toaster />
        <Header
          onSave={saveChanges}
          reset={() => setFormData(savedData)}
          isChanged={isChanged}
        />
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
                    {tabs.map((t) => (
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
                      <TextEditor
                        key={1}
                        data={TextEditorDataAbout}
                        onChange={(newData: string) =>
                          setTextEditorDataAbout(newData)
                        }
                      />
                    </div>
                  )}
                  {activeTab === "Mission & Vision" && (
                    <div
                      style={{
                        height: "250px",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      <TextEditor
                        key={2}
                        data={TextEditorDataMV}
                        onChange={(newData: string) =>
                          setTextEditorDataMV(newData)
                        }
                      />
                    </div>
                  )}
                  {activeTab === "History" && (
                    <div
                      style={{
                        height: "250px",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      <TextEditor
                        key={3}
                        data={TextEditorDataHIS}
                        onChange={(newData: string) =>
                          setTextEditorDataHIS(newData)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0">
        {/* 2. FORM CONTENT AREA */}
        <div style={{ marginTop: 20 }}>
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
    </>
  );
}
