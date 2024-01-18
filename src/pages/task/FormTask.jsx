import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { useContextProvider } from "../../context/useContext";
import { useEffect, useRef, useState } from "react";
import BackBtn from "../../components/buttons/BackBtn";
const url = import.meta.env.VITE_API_URL;

export default function FormTask({ label, textBtn }) {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );
  const [taskObj, setTaskObj] = useState({ title: "" });
  const { checklistId, taskId } = useParams();
  const navigate = useNavigate();
  const { createTask, updateTask } = useContextProvider();

  useEffect(() => {
    if (taskId) {
      fetch(`${url}/${userId}/checklist/${checklistId}/task/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((task) => setTaskObj({ title: task.title }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskId) {
      updateTask(token, userId, checklistId, taskId, taskObj, navigate);
    } else {
      createTask(token, userId, checklistId, taskObj, navigate);
    }
  };

  return (
    <Container fluid className="  d-flex justify-content-center p-3">
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
            value={taskObj.title}
            onChange={(e) => setTaskObj({ title: e.target.value })}
            placeholder="Digite o nome da tarefa"
            required
          />

          <button type="submit" className="btn btn-success p-3">
            {textBtn}
          </button>
          <BackBtn to={`/user/checklist/${checklistId}`} />
        </div>
      </form>
    </Container>
  );
}
