export function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-90">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "2rem", height: "2rem" }}
      ></div>
      <div className="text-primary fw-semibold">Loading..</div>
    </div>
  );
}
