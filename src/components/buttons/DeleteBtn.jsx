import { Link } from "react-router-dom";

export default function DeleteBtn({ handleDeleteChecklist }) {
  return (
    <Link onClick={handleDeleteChecklist} className="btn btn-danger ">
      Excluir
    </Link>
  );
}
