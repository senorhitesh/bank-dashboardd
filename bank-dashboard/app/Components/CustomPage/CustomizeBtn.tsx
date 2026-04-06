import { ArrowRight } from "lucide-react";

const CustomizeBtn = ({ onCLick }: { onCLick: () => void }) => {
  return (
    <button
      onClick={onCLick}
      style={{
        width: "100vw",
        height: "80px",
      }}
      className=" border customsieBtn border-1  d-flex overflow-hidden align-items-center  gap-2 position-relative "
    >
      <div className="CBComponent">
        <p className="m-0">----</p>
        <p className="m-0">----</p>
      </div>
      <div
        style={{
          display: "flex",
          marginLeft: "82px",
          flexDirection: "column",
        }}
      >
        <h5
          style={{ textAlign: "left", color: "#111" }}
          className="m-0 fw-semibold"
        >
          Don't have Idea ?
        </h5>
        <p
          style={{ textAlign: "left", letterSpacing: "-.01rem" }}
          className="m-0 text-secondary "
        >
          Start with a Customised Template
        </p>
      </div>
      <div>
        <ArrowRight color="#8a8a8a" />
      </div>
    </button>
  );
};
export default CustomizeBtn;
