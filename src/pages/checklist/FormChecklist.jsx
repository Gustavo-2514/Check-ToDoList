const url = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { useContextProvider } from "../../context/useContext";
import BackBtn from "../../components/buttons/BackBtn";

export default function FormChecklist({ label, textBtn }) {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );
  const [checklistObj, setChecklistObj] = useState({ name: "" });
  const { checklistId } = useParams();
  const navigate = useNavigate();
  const { createChecklist, updateChecklist } = useContextProvider();

  useEffect(() => {
    if (checklistId) {
      fetch(`${url}/${userId}/checklist/${checklistId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((checklist) => setChecklistObj({ name: checklist.name }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checklistId) {
      updateChecklist(token, userId, checklistId, checklistObj, navigate);
    } else {
      createChecklist(token, userId, checklistObj, navigate);
    }
  };

  return (
    <Container
      fluid
      className="containerMain d-flex justify-content-center p-3"
    >
      <form
        className="formMain d-flex flex-column align-items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="labelFormMain" htmlFor="newChecklist">
            {label}
          </label>
        </div>

        <div className="containerInput d-flex gap-2">
          <input
            className="inputFormMain"
            id="newChecklist"
            type="text"
            value={checklistObj.name}
            onChange={(e) => setChecklistObj({ name: e.target.value })}
            required
            placeholder="Digite o nome da lista"
          />

          <button type="submit" className="btn btn-success p-3">
            {textBtn}
          </button>
          <BackBtn to={"/user/checklists"} />
        </div>
      </form>
    </Container>
  );
}
