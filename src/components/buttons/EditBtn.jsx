import { Link } from "react-router-dom";

export default function EditBtn({to, text}) {
  return <Link to={to} className="btn btn-warning editBtn">{text}</Link>;
}
