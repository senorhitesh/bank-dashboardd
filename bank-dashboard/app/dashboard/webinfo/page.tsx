"use client";

import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Save } from "lucide-react";
import React, { useState } from "react";

export default function WebInfoSettings() {
  const [infoChnaged, setinfoChnaged] = useState(false);
  const [changedInfo, setchangedInfo] = useState("");

  return (
    <div className="mx-auto p-6 md:p-8  min-h-screen">
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
              className={`bg-red-500 text-white  active:scale-95 transtion-all duration-150`}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              setinfoChnaged(false);
            }}
            className={`flex  items-center gap-2   active:scale-95 transtion-all duration-150  ${infoChnaged ? "bg-blue-500 " : "text-neutral-400 bg-neutral-100 border border-neutral-50"}`}
          >
            <Save
              className={`${infoChnaged ? "text-neutral-100" : "text-neutral-400"}`}
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
              defaultValue="The Chandrapur District Central Co-operative Bank"
              placeholder="Enter website title"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="Open/Close Time"
              defaultValue="10:00 AM to 04:00 PM 2nd & 4th Saturday Closed"
              placeholder="e.g., 10:00 AM to 04:00 PM"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="Location City"
              defaultValue="Bank Location City"
              placeholder="Enter city"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="Registration No."
              defaultValue="RPCD.NAG.DCCB/L/09"
              placeholder="Enter registration number"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="RBI License No."
              defaultValue="CDCC/test01"
              placeholder="Enter RBI License number"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="Bank IFSC"
              defaultValue="CDCC/test01"
              placeholder="Enter IFSC code"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="PAN No."
              defaultValue="CDCC/test01"
              placeholder="Enter PAN number"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="TAN No."
              defaultValue="CDCC/test01"
              placeholder="Enter TAN number"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="GST No."
              defaultValue="CDCC/test01"
              placeholder="Enter GST number"
              className="md:col-span-2 " // Spans full width if it's the odd one out
              onChange={(value: string) => {
                setchangedInfo(value);
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
              label="Net Banking Link"
              placeholder="https://netbanking.domain.com"
              type="url"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="Android Application Link"
              defaultValue="https://play.google.com/store/apps/details?id=..."
              placeholder="Play Store URL"
              type="url"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="iOS Application Link"
              placeholder="App Store URL"
              type="url"
              onChange={(value: string) => {
                setchangedInfo(value);
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
              label="Facebook Link"
              defaultValue="#"
              placeholder="https://facebook.com/..."
              type="url"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="Instagram Link"
              defaultValue="#"
              placeholder="https://instagram.com/..."
              type="url"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="Twitter Link"
              defaultValue="#"
              placeholder="https://twitter.com/..."
              type="url"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
            <Input
              label="WhatsApp Banking"
              placeholder="WhatsApp wa.me link"
              type="url"
              onChange={(value: string) => {
                setchangedInfo(value);
                setinfoChnaged(true);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
