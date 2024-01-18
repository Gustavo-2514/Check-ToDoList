const url = import.meta.env.VITE_API_URL;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/useContext";
import { Container } from "reactstrap";
import EditBtn from "../../components/buttons/EditBtn";
import DeleteBtn from "../../components/buttons/DeleteBtn";
import CreateBtn from "../../components/buttons/CreateBtn";
import Loalding from "../../components/Loalding";

export default function Checklists() {
  const navigate = useNavigate();
  const [unauthorized, setUnauthorized] = useState(null);
  const [checklistsUser, setChecklistsUser] = useState(null);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );
  const { deleteChecklist } = useContextProvider();

  useEffect(() => {
    const getChecklistsUser = async () => {
      if (!userId) {
        setUnauthorized(true);
        return;
      }

      try {
        const response = await fetch(url + `/${userId}/checklists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setChecklistsUser(data);
      } catch (error) {
        throw new Error("Erro ao carregar Listas de Tarefas");
      }
    };
    getChecklistsUser();
  }, []);

  const handleDeleteChecklist = async (checklistId) => {
    const newDataUser = await deleteChecklist(token, userId, checklistId);
    setChecklistsUser(newDataUser);
  };

  return (
    <>
      <h1 className=" text-center my-4">Listas de Tarefas</h1>

      {checklistsUser ? (
        checklistsUser.msg ? (
          <h1>{checklistsUser.msg}</h1>
        ) : (
          <section className="">
            <Container className=" d-flex justify-content-center p-3">
              <CreateBtn
                to={`/user/checklist/create`}
                text={"Nova lista de tarefas"}
              />
            </Container>
            <Container
              fluid
              className=" d-flex justify-content-center flex-wrap gap-4"
            >
              {checklistsUser.checklistId.map((checklist) => (
                <div
                  style={{ width: "20rem", padding: "2rem" }}
                  className="bg-light "
                  key={checklist._id}
                >
                  <h2 className="text-success ">
                    {checklist.name.length > 15
                      ? checklist.name.slice(0, 15) + "..."
                      : checklist.name}
                  </h2>
                  <p className="text-black fw-semibold">
                    Tarefas: {checklist.taskId.length}
                  </p>
                  <div className=" d-flex gap-2">
                    <Link
                      to={`/user/checklist/${checklist._id}`}
                      className="btn btn-primary"
                    >
                      Ver
                    </Link>
                    <EditBtn
                      to={`/user/checklist/${checklist._id}/update`}
                      text={"Editar"}
                    />
                    <DeleteBtn
                      handleDeleteChecklist={() =>
                        handleDeleteChecklist(checklist._id)
                      }
                    />
                  </div>
                </div>
              ))}
            </Container>
          </section>
        )
      ) : (
        <Loalding />
      )}
    </>
  );
}
