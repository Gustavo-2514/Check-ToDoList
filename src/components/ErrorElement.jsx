export default function ErrorElement({ textError }) {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-danger gap-2 ">
      <h1>{textError}</h1>
    </div>
  );
}
