"use client";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Save } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSegmentState } from "next/dist/next-devtools/userspace/app/segment-explorer-node";

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
  const [infoChnaged, setinfoChnaged] = useState(false);
  const [changedInfo, setchangedInfo] = useState("");

  const [formData, setformData] = useState(initialBankData);
  const [savedData, setSavedData] = useState(initialBankData);
  function undoChanges() {
    setformData(savedData); // ✅ revert to last saved state
    setinfoChnaged(false);
  }

  const isChanged = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(savedData);
  }, [formData, savedData]);

  return (
    <div className="mx-auto p-6 md:p-8  min-h-screen">
      <Toaster />
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Web Info Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your bank's public details, application links, and social
            media presence.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {infoChnaged && (
            <Button
              onClick={undoChanges}
              className={`bg-red-500 text-white  active:scale-95 transtion-all duration-150`}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              if (!isChanged) return;

              setSavedData(formData);
              setinfoChnaged(false);

              toast.success("Information updated successfully!", {
                position: "top-center",
              });
            }}
            disabled={!isChanged}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-150 active:scale-95
    ${
      isChanged
        ? "bg-blue-500 hover:bg-blue-600 text-white"
        : "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
    }`}
          >
            <Save
              className={`w-4 h-4 ${
                isChanged ? "text-white" : "text-neutral-400"
              }`}
            />
            Save Changes
          </Button>
        </div>
      </div>

      <form className="space-y-6">
        {/* CARD 1: Bank Basic Details */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Bank Basic Details
            </h2>
            <p className="text-sm text-gray-500">
              Essential public information displayed on your website.
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Website Title"
              value={formData.WebsiteTitle}
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  WebsiteTitle: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.OpenCloseTime}
              label="Open/Close Time"
              placeholder="e.g., 10:00 AM to 04:00 PM"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  OpenCloseTime: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.LocationCity}
              label="Location City"
              placeholder="Enter city"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  LocationCity: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.RegistrationNo}
              label="Registration No."
              placeholder="Enter registration number"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  RegistrationNo: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.RBILicenseNo}
              label="RBI License No."
              placeholder="Enter RBI License number"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  RBILicenseNo: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.BankIFSC}
              label="Bank IFSC"
              placeholder="Enter IFSC code"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  BankIFSC: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.PAN}
              label="PAN No."
              placeholder="Enter PAN number"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  PAN: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.TAN}
              label="TAN No."
              placeholder="Enter TAN number"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  TAN: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.GST}
              label="GST No."
              placeholder="Enter GST number"
              className="md:col-span-2 " // Spans full width if it's the odd one out
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  GST: value,
                }));
                setinfoChnaged(true);
              }}
            />
          </div>
        </div>

        {/* CARD 2: Banking Links */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Banking Links</h2>
            <p className="text-sm text-gray-500">
              URLs for net banking and mobile applications.
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              value={formData.NetBankingLink}
              label="Net Banking Link"
              placeholder="https://netbanking.domain.com"
              type="url"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  NetBankingLink: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.AndroidApplicationLink}
              label="Android Application Link"
              placeholder="Play Store URL"
              type="url"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  AndroidApplicationLink: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.IOSApplicationLink}
              label="iOS Application Link"
              placeholder="App Store URL"
              type="url"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  IOSApplicationLink: value,
                }));
                setinfoChnaged(true);
              }}
            />
          </div>
        </div>

        {/* CARD 3: Social Media */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Social Media</h2>
            <p className="text-sm text-gray-500">
              Connect your bank's official social media profiles.
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              value={formData.FacebookLink}
              label="Facebook Link"
              placeholder="https://facebook.com/..."
              type="url"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  FacebookLink: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.InstagramLink}
              label="Instagram Link"
              placeholder="https://instagram.com/..."
              type="url"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  InstagramLink: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.Twitter}
              label="Twitter Link"
              defaultValue="#"
              placeholder="https://twitter.com/..."
              type="url"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  Twitter: value,
                }));
                setinfoChnaged(true);
              }}
            />
            <Input
              value={formData.WhatsAppBanking}
              label="WhatsApp Banking"
              placeholder="WhatsApp wa.me link"
              type="url"
              onChange={(value: string) => {
                setformData((prev) => ({
                  ...prev,
                  WhatsAppBanking: value,
                }));
                setinfoChnaged(true);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
