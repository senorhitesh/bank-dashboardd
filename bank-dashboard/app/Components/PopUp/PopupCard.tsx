import { Image, Calendar, Pencil, Trash2 } from "lucide-react";

interface StatusDetail {
  title: string;
  icon: React.ElementType;
  color: string;
}

interface Popup {
  id: number;
  img: string;
  title: string;
  status: "Published" | "Draft";
  lastUpdate: string;
  statusDetails: StatusDetail[];
}

const PopupCard = ({
  popup,
  onEdit,
  onDelete,
}: {
  popup: Popup;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="card border-light shadow-sm hover-shadow-md transition-all p-2">
      <div
        style={{
          justifyContent: "space-between",
        }}
        className="card-body d-flex align-items-center gap-3 p-1"
      >
        <div className="d-flex gap-2 align-items-center">
          {" "}
          <div
            className="rounded bg-light d-flex align-items-center justify-content-center overflow-hidden shrink-0"
            style={{ width: "80px", height: "56px" }}
          >
            {popup.img ? (
              <img
                src={popup.img}
                alt={popup.title}
                className="w-100 h-100 object-fit-cover"
              />
            ) : (
              <Image size={20} className="text-secondary opacity-50" />
            )}
          </div>
          {/* Info Content */}
          <div className="grow min-width-0">
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <p
                className="small fw-bold text-dark mb-0 text-truncate"
                style={{ maxWidth: "250px" }}
              >
                {popup.title}
              </p>
              <span
                className={`badge rounded-pill fw-medium ${
                  popup.status === "Published"
                    ? "bg-success-subtle text-success"
                    : "bg-warning-subtle text-warning"
                }`}
              >
                {popup.status}
              </span>
            </div>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              {popup.lastUpdate && (
                <span
                  className="d-flex align-items-center gap-1 small text-muted"
                  style={{ fontSize: "0.75rem" }}
                >
                  <Calendar size={12} /> {popup.lastUpdate}
                </span>
              )}
              {popup.statusDetails.map((detail, i) => {
                const Icon = detail.icon;
                return (
                  <span
                    key={i}
                    className={`d-flex align-items-center gap-1 small ${detail.color}`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    <Icon size={12} /> {detail.title}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-1 shrink-0">
          <button
            onClick={onEdit}
            className="btn btn-sm btn-light text-muted border-0"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete()}
            className="btn btn-sm btn-light text-muted border-0 hover-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
