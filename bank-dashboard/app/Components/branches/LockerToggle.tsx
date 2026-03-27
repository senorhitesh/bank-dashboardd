import React from "react";

const LockerToggle = ({
  onClick,
  formLocker,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  formLocker: boolean;
}) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-100">
      <div>
        <p className="text-sm font-medium text-neutral-700">Locker facility</p>
        <p className="text-xs text-neutral-400">
          Does this branch have a locker?
        </p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                ${formLocker ? "bg-blue-600" : "bg-neutral-300"}`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform
                  ${formLocker ? "translate-x-4" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
};

export default LockerToggle;
