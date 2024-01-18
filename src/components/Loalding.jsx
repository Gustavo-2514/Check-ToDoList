export default function Loalding() {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
      <h1>Carregando</h1>
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
