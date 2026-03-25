import {
  ArrowUpRight,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  EllipsisVertical,
  Megaphone,
} from "lucide-react";
import AnalayticCard from "../Components/AnalayticCard";
import { Edit02 } from "@untitledui/icons";
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
    <div className="flex items-start gap-4 py-4 border-b last:border-b-0 border-gray-200">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        <Icon className="w-5 h-5" />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-400 font-medium">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
};
export default function DashboardPage() {
  return (
    <div className=" flex flex-col">
      <div className="flex items-center justify-between">
        {" "}
        <p className="text-xl font-bold text-neutral-800">Analytics</p>
        <div className="bg-white cursor-pointer border font-medium gap-1 group items-center justify-center border-neutral-200 shadow rounded-md flex px-2 py-1 w-fit ">
          <p className="text-sm  text-neutral-800">Visit Site</p>
          <ArrowUpRight className="text-neutral-300 transition group-hover:text-neutral-700 text-sm" />
        </div>
      </div>
      <div className="w-full mt-3  gap-4 grid lg:grid-cols-2 md:grid-col-2 sm:grid-cols-1 rounded-md">
        <AnalayticCard
          Title="Page views"
          data={"12000"}
          icon={Eye}
          percentage={"3.3"}
        />
        <AnalayticCard
          Title="Last Login Time"
          icon={User}
          data={"2026-03-20 12:21:02"}
        />
      </div>
      {/* Bank Details */}
      <div className="w-full mt-3  gap-4 flex rounded-md">
        {/* Bank Card */}
        <div className="w-full  border border-gray-100 rounded-xl bg-white shadow-sm p-6">
          <div className="flex justify-between w-full">
            {" "}
            <p className="text-sm font-semibold text-neutral-500 mb-1">
              Details
            </p>
            <Edit02 className="text-gray-400 active:scale-95 hover:text-blue-400 transtion" />
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
        {/* Details Card */}
        <div className="w-1/3 bg-white border h-fit border-gray-200 rounded-xl shadow-sm p-5">
          <div className="justify-between flex">
            {" "}
            <p className="text-sm font-semibold text-neutral-500 mb-4">
              Overview
            </p>
            <EllipsisVertical className="text-neutral-400 active:scale-95 hover:text-neutral-800 transtion" />
          </div>

          <div className="flex flex-col divide-y h-fit divide-gray-100">
            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-neutral-700">Users</p>
              <p className="text-lg font-semibold text-neutral-900">32</p>
            </div>

            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-neutral-700">Staff</p>
              <p className="text-lg font-semibold text-neutral-900">12</p>
            </div>

            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-neutral-700">Branch</p>
              <p className="text-lg font-semibold text-neutral-900">02</p>
            </div>
          </div>
        </div>
      </div>
      {/* News and Notification */}
      <div className="w-full border mt-3 border-gray-200 rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <Megaphone className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
            <h2 className="text-sm font-medium text-slate-600">
              News & Notifications
            </h2>
            <p className="text-sm bg-blue-500 px-3 text-white font-medium py-1 rounded-full ">
              New
            </p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
          <div
            className={` flex flex-col gap-4 p-4 hover:bg-gray-50 transition-colors `}
          >
            <div className="flex flex-col  sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex w-full justify-between">
                <p className={`text-sm font-medium   text-gray-600`}>
                  Welcome to The Chandrapur District Central Co-operative Bank
                  Ltd
                </p>
                <p className={`text-sm font-medium   text-gray-500`}>
                  2025-02-22
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
