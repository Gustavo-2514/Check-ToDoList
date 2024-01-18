import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import CreateBtn from "../../components/buttons/CreateBtn";
import EditBtn from "../../components/buttons/EditBtn";
import DeleteBtn from "../../components/buttons/DeleteBtn";
import { useContextProvider } from "../../context/useContext";
import Loalding from "../../components/Loalding";
const url = import.meta.env.VITE_API_URL;

export default function ViewChecklist() {
  const [checklist, setChecklist] = useState(null);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );

  const { checklistId } = useParams();
  const { updateDone, deleteTask } = useContextProvider();

  useEffect(() => {
    async function getChecklistById() {
      try {
        const response = await fetch(
          `${url}/${userId}/checklist/${checklistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        data.taskId.sort((a, b) => a.done - b.done);
        setChecklist(data);
      } catch (error) {
        return console.log("Algo deu errado");
      }
    }
    getChecklistById();
  }, []);

  const handleDone = async (task, index) => {
    const checklistUpdate = await updateDone(
      token,
      checklist,
      userId,
      checklistId,
      task,
      index
    );

    if (typeof checklistUpdate === "object") {
      checklistUpdate.taskId.sort((a, b) => a.done - b.done);

      setChecklist(checklistUpdate);
    } else {
      console.log(checklistUpdate);
    }
  };

  const handleDelete = async (taskid) => {
    const checklistUpdate = await deleteTask(
      token,
      userId,
      checklistId,
      taskid
    );

    if (typeof checklistUpdate === "object") {
      checklistUpdate.taskId.sort((a, b) => a.done - b.done);

      setChecklist(checklistUpdate);
    } else {
      alert(checklistUpdate);
    }
  };

  return (
    <>
      {checklist ? (
        <Container className=" d-flex flex-column gap-3 ">
          <div className="containerTitle d-flex justify-content-center gap-3">
            {<h1 className="text-light  text-center">{checklist.name}</h1>}
            <div className="containerButtons d-flex align-items-center gap-2 ">
              <CreateBtn
                to={`/user/checklist/${checklistId}/task/create`}
                text={"Criar Tarefa"}
              />
              <EditBtn
                to={`/user/checklist/${checklist._id}/update`}
                text={"Editar Lista"}
              />
            </div>
          </div>

          {checklist.taskId.map((task, index) => (
            <div
              key={task._id}
              className="d-flex bg-light justify-content-between align-items-center p-3 containerTask"
            >
              <div className="containerInputTask d-flex gap-5">
                <input
                  className="inputRadio"
                  id={`task${task._id}`}
                  type="radio"
                  checked={task.done}
                  onChange={() => handleDone(task._id, index)}
                  onClick={() => {
                    if (task.done) {
                      handleDone(task._id, index);
                    }
                  }}
                />
                {task.done ? (
                  <label
                    htmlFor={`task${task._id}`}
                    className="labelTask text-decoration-line-through text-success fs-4"
                  >
                    {task.title.includes(" ")
                      ? task.title
                      : task.title.slice(0, 25) + "..."}
                  </label>
                ) : (
                  <label
                    htmlFor={`task${task._id}`}
                    className="labelTask text-success fs-4"
                  >
                    {task.title.includes(" ")
                      ? task.title
                      : task.title.slice(0, 25) + "..."}
                  </label>
                )}
              </div>

              <div className=" d-flex gap-2">
                <EditBtn
                  to={`/user/checklist/${checklistId}/task/${task._id}/update`}
                  text={"Editar"}
                />
                <DeleteBtn
                  handleDeleteChecklist={() => handleDelete(task._id)}
                />
              </div>
            </div>
          ))}
        </Container>
      ) : (
        <Loalding />
      )}
    </>
  );
}
