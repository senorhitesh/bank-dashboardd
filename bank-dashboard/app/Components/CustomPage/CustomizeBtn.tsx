import { ArrowRight } from "lucide-react";

const CustomizeBtn = ({ onCLick }: { onCLick: () => void }) => {
  return (
    <div style={{ width: "100%" }}>
      <button
        style={{}}
        onClick={onCLick}
        className=" border customsieBtn border-1 container d-flex overflow-hidden align-items-center  gap-2 position-relative "
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
    </div>
  );
};
export default CustomizeBtn;
