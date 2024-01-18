import { Link } from "react-router-dom";

export default function CreateBtn({ to, text }) {
  return (
    <Link to={to} className="btn btn-success ">
      {text}
    </Link>
  );
}
