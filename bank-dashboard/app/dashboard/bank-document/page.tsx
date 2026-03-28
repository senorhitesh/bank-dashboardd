"use client";

import { Link2, Upload } from "lucide-react";
import Noducment from "../../Components/Bank-Document/Noducment";
import { useState } from "react";
import DocuCard from "@/app/Components/Bank-Document/DocCard";
import LinkModal from "../../Components/Bank-Document/Modal";

// Unified interface to match DocuCard expectations
export interface docuProp {
  id: number;
  title: string;
  fileTitle: string;
  type: string;
  size: string;
  url?: string; // Added optional url
}

const Page = () => {
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [documentData, setdocumentData] = useState<docuProp[]>([]);

  function formData(title: string, file: File[] | null) {
    if (!file || file.length === 0) return;

    const rawSize = file[0].size;
    const sizeStr =
      rawSize < 1024 * 1024
        ? `${(rawSize / 1024).toFixed(0)} KB`
        : `${(rawSize / (1024 * 1024)).toFixed(2)} MB`;
    setdocumentData((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title,
        fileTitle: file[0].name,
        type: "Document",
        size: sizeStr,
        url: URL.createObjectURL(file[0]),
      },
    ]);
  }
  function deleteDocument(cardId: number) {
    setdocumentData((prev) => prev.filter((a) => a.id !== cardId));
  }

  return (
    <div className="container-fluid p-1">
      {modalOpen && (
        <LinkModal onClose={() => setmodalOpen(false)} formdata={formData} />
      )}

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold text-dark mb-1">Documents</h2>
          <p className="small text-muted mb-0">
            {documentData.length} documents · sorted by sequence
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative d-none d-sm-block">
            <Link2
              size={14}
              className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
            />
            <input
              type="text"
              placeholder="Search links..."
              className="form-control form-control-sm ps-4"
              style={{ width: "180px" }}
            />
          </div>
          <button
            onClick={() => setmodalOpen(true)}
            className="btn btn-white border shadow-sm btn-sm fw-medium d-flex align-items-center gap-2 px-3"
          >
            <Upload size={16} /> Document
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="row g-3">
        {documentData.length === 0 ? (
          <div className="col-12">
            <Noducment />
          </div>
        ) : (
          documentData.map((card) => (
            <div key={card.id} className="col-12 col-md-6 ">
              <DocuCard deleteDocument={deleteDocument} card={card} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
