import React from "react";
import { ArrowUpRight, Eye, LucideIcon } from "lucide-react";

interface AnalayticProp {
  icon: LucideIcon;
  percentage?: string;
  Title: string;
  data: string;
}

const AnalayticCard = ({ icon, data, percentage, Title }: AnalayticProp) => {
  const Icon = icon;

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div className="flex hover:bg-blue-50 transition items-center justify-center w-11 h-11 border border-gray-200 rounded-lg text-slate-600">
          <Icon />
        </div>
        {/*     Text Content */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-slate-600 mb-1">{Title}</p>
          <p className="text-2xl font-bold text-slate-700 tracking-tight leading-none">
            {data}
          </p>
        </div>
      </div>

      {/* Percentage Badge */}
      {percentage && (
        <div className="flex items-center self-end px-2 py-0.5 border border-gray-200 rounded text-emerald-600 font-medium text-sm">
          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" strokeWidth={2.5} />$
          {percentage} %
        </div>
      )}
    </div>
  );
};

export default AnalayticCard;
