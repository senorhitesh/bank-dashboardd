"use client";
import toast, { Toaster } from "react-hot-toast";
import { Link2, X, Upload, FileText, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import Input from "../../Components/branches/Input";

const LinkModal = ({
  onClose,
  formdata,
}: {
  onClose: () => void;
  formdata: (title: string, file: FileList | null) => void; // Changed to FileList to match input
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, settitle] = useState<string>("");
  const [file, setFile] = useState<FileList | null>(null);

  function onSubmit() {
    if (!title) {
      toast.error("Please Enter a Title");
      return;
    }
    if (!file || file.length === 0) {
      toast.error("Please upload your document.");
      return;
    }
    formdata(title, file);
    onClose();
  }

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
        style={{ zIndex: 1060 }}
      >
        <Toaster />

        <div
          className="card shadow-lg border-0"
          style={{ width: "100%", maxWidth: "400px", borderRadius: "16px" }}
        >
          {/* Header */}
          <div className="card-header bg-white py-3 d-flex align-items-center justify-content-between border-bottom-0">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary bg-opacity-10 p-2 rounded">
                <Link2 size={16} className="text-primary" />
              </div>
              <h6 className="fw-bold mb-0">Upload Document</h6>
            </div>
            <button
              onClick={onClose}
              className="btn btn-sm btn-light rounded-circle"
            >
              <X size={16} />
            </button>
          </div>

          <div className="card-body py-3">
            {/* Title Input */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Title</label>
              <Input
                value={title}
                onChange={(e) => settitle(e.target.value)}
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g. Reserve Bank of India"
              />
            </div>

            {/* Document Upload / Preview Area */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Document</label>

              {!file || file.length === 0 ? (
                /* Empty State (Upload Button) */
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border border-dashed rounded-3 d-flex flex-column align-items-center justify-content-center gap-1 text-secondary"
                  style={{
                    height: 100,
                    cursor: "pointer",
                    borderStyle: "dashed",
                  }}
                >
                  <Upload size={20} className="opacity-50" />
                  <span className="small">Click to upload Document</span>
                </div>
              ) : (
                /* Uploaded State (File Preview) */
                <div className="border rounded-3 p-3 d-flex align-items-center justify-content-between bg-light">
                  <div className="d-flex align-items-center gap-3 overflow-hidden">
                    <div className="bg-white p-2 rounded border">
                      <FileText size={24} className="text-primary" />
                    </div>
                    <div className="overflow-hidden">
                      <div
                        className="small fw-bold text-truncate"
                        style={{ maxWidth: "180px" }}
                      >
                        {file[0].name}
                      </div>
                      <div className="text-muted" style={{ fontSize: "10px" }}>
                        {(file[0].size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <input
                onChange={(e) => setFile(e.target.files)}
                ref={fileRef}
                className="d-none"
                type="file"
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer bg-white border-top-0 d-flex justify-content-end gap-2 pb-4 px-4">
            <button
              onClick={onClose}
              className="btn btn-sm btn-light border fw-medium px-3"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="btn btn-sm btn-primary fw-medium px-3"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkModal;
