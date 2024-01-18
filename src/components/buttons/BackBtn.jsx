import { Link } from "react-router-dom";

export default function BackBtn({ to }) {
  return (
    <Link to={to} className="btn btn-primary p-3">
      Voltar
    </Link>
  );
}
