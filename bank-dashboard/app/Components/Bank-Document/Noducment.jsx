const Noducment = () => {
  return (
    <div
      className="w-100 h-100  d-flex justify-content-center align-items-center"
      style={{ minHeight: "200px" }}
    >
      <div className="text-center ">
        <h3
          style={{
            letterSpacing: "-0.05em",
            color: "#272727",
          }}
          className="mb-1 tracking-tight  fw-semibold"
        >
          No Document Uploaded
        </h3>
        <p className="text-secondary mb-0">Start uploading by clicking here.</p>
      </div>
    </div>
  );
};

export default Noducment;
